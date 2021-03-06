import { useState, useCallback, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useDispatch } from 'react-redux'
import { UsersListActionCreater } from '../redux/userListReducer'

// eslint-disable-next-line no-shadow
enum typeRequest {
  UserList = 'users_list',
}

export type RequestKeys = keyof typeof typeRequest

const useWS = (token: string | null) => {
  const dispatch = useDispatch()
  const socketUrl = `ws://109.194.37.212:2346/?type=test&ws_id=${token}`

  const [messageHistory, setMessageHistory] = useState([])
  //CONFIG

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => {
      console.error('саидениннеи прирвона')
      return true
    },
  })

  //STATUS

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]

  //EVENTS

  useEffect(() => {
    try {
      let responseData = []
      if (lastMessage) {
        responseData = JSON.parse(lastMessage?.data)
      }
      console.log(responseData)
      switch (responseData.type) {
      case typeRequest.UserList:
        dispatch(UsersListActionCreater.setUsers(responseData.data))
        break

      default:
        break
      }
    } catch (error) {
      console.error(error)
    }
  }, [lastMessage, setMessageHistory])

  //HANDLERS
  console.log(connectionStatus, 'connectionStatus')
  const getData = (type: RequestKeys) => {
    switch (type) {
    case 'UserList':
      sendMessage(JSON.stringify({ type: typeRequest[type] }))
      break

    default:
      break
    }
  }
  return { getData, connectionStatus }
}

export default useWS

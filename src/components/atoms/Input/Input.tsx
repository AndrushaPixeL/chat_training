import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { IFormInputs } from '../../organisms/LoginForm'
import './Input.scss'

interface InputProps {
  labelInput: string
  register: UseFormRegister<IFormInputs>
  error: string | undefined
  nameInput: 'firstName' | 'password'
}
const getClassNames = (error: string | undefined): string => {
  if (error) {
    return 'input input_error'
  }
  return 'input'
}

const Input: FC<InputProps> = ({ labelInput, register, error, nameInput }) => {
  const classNames = React.useMemo(() => {
    return getClassNames(error)
  }, [error])

  return (
    <div className="input_container">
      <div className="input_label">{labelInput}</div>
      <input {...register(nameInput)} type="text" className={classNames} />
      <div className="error_message">{error}</div>
    </div>
  )
}

export default Input

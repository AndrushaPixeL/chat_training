import React, { FC, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useHistory } from 'react-router'
import { FieldError, useForm } from 'react-hook-form'
import Button from '../../atoms/Button/Button'
import Input from '../../atoms/Input/Input'
import './LoginForm.scss'

export interface IFormInputs {
  firstName: string
  password: number
  securityCode: string
}
export interface FormErrors {
  firstName?: FieldError | undefined
  password?: FieldError | undefined
  securityCode?: FieldError | undefined
}

const schema = yup
  .object({
    firstName: yup.string().required().min(4).max(14),
    password: yup
      .string()
      .required()
      .min(8)
      .max(16)
      .matches(/^[a-zA-Z0-9]+$/i),
    securityCode: yup.string().required().min(4),
  })
  .required()

const LoginForm: FC = () => {
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  })
  const onSubmit = (): void => history.push('/chats')

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs_container">
          <Input
            labelInput="User name"
            register={() => register('firstName')}
            error={errors.firstName?.message}
            placeholder="Input user name"
          />
          <Input
            labelInput="Password"
            register={() => register('password')}
            error={errors.password?.message}
            placeholder="Input password"
          />
        </div>
        <div className="captcha_container">
          <Input
            labelInput="Security code"
            register={() => register('securityCode')}
            error={errors.firstName?.message}
            placeholder="Security code"
          />
          <div className="captcha">
            <button>asdasda</button>
          </div>
        </div>
        <Button typeButton="submit" classNameButton="button">
          Login
        </Button>
      </form>
    </>
  )
}

export default LoginForm

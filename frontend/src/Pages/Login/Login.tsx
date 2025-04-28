import { TextField } from '@mui/material'
import React from 'react'

type Props = {}

const Login = (props: Props) => {
  return (
    <div>
      <p>First name</p>
      <TextField />

      <p>Last name</p>
      <TextField />

      <p>Email name</p>
      <TextField />

      <p>Password</p>
      <TextField />
    </div>
  )
}

export default Login
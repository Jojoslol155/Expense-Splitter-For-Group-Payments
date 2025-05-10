import React, { useContext, useEffect, useState } from 'react'
import { backdropClasses, Button, TextField } from '@mui/material'
import { useLogin } from '../../Hooks/Auth'
import './Login.css'
import { AuthContext } from '../../Context/Auth'
import { UserContextType } from '../../Types'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Login = () => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const {token} = useContext(AuthContext) as UserContextType
  const [login] = useLogin({username, password})

  const style = {
    backgroundColor: 'white'
  }

  const buttonStyle = {
    backgroundColor: 'var(--secondary)'
  }

  return token && token !== '' ? <>
      <Navigate to="/" />
    </> : (
    <div className='loginFormWrapper'>
      <div className='loginHeader'>
        $plit
      </div>
      <TextField 
        value={username} 
        sx={style} 
        label={"Username"}
        id="filled-required"
        variant="filled"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          event.preventDefault()
          setUsername(event.target.value)
      }}/>

      <TextField 
        value={password} 
        sx={style} 
        label={"Password"}
        type={"password"}
        id="filled-password-input"
        variant="filled"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          event.preventDefault()
          setPassword(event.target.value)
      }}/>
      <Button variant="contained" style={buttonStyle} onClick={() => {
        login()
      }}>
        LOGIN
      </Button>
      <div>
        Don't have an account? Register <Link className='registerLink' to="/register">here</Link>
      </div>
    </div>
  )
}

export default Login
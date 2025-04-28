import React, { useContext, useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useRegister } from '../../Hooks/Auth'
import './Register.css'
import { AuthContext } from '../../Context/Auth'
import { UserContextType } from '../../Types'
import { Link, Navigate } from 'react-router-dom'

const Register = () => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const {token} = useContext(AuthContext) as UserContextType
  const [registerUser] = useRegister({username, password, firstName, lastName, email})

  const buttonStyle = {
    backgroundColor: '#29A3A3'
  }

  const style = {
    backgroundColor: 'white'
  }

  return token && token !== '' ? <>
    <Navigate to="/" />
    </> : (
    <div className='registerFormWrapper'>
      <div className='registerHeader'>
        $plit
      </div>
      <TextField 
        value={username} 
        sx={style} 
        label={"Username"}
        id="filled-required"
        variant="filled"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(event.target.value)
      }}/>

      <TextField 
        value={firstName} 
        sx={style} 
        label={"First name"}
        id="filled-required"
        variant="filled"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setFirstName(event.target.value)
      }}/>

      <TextField 
        value={lastName} 
        sx={style} 
        label={"Last name"}
        id="filled-required"
        variant="filled"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setLastName(event.target.value)
      }}/>

      <TextField 
        value={email} 
        sx={style} 
        label={"Email"}
        id="filled-required"
        variant="filled"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value)
      }}/>

      <TextField 
        value={password} 
        sx={style} 
        label={"Password"}
        type={"password"}
        id="filled-password-input"
        variant="filled"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value)
      }}/>
      <Button variant="contained" style={buttonStyle} 
        disabled={password == '' || firstName == '' || lastName == '' || email == '' || username == ''} 
        onClick={() => {
          registerUser()
        }}>
        Register
      </Button>
      <div>
        Already have an account? Login <Link className='loginLink' to="/login"> here </Link>
      </div>
    </div>
  )
}

export default Register
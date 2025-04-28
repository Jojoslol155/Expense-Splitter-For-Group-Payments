import React, { useContext } from 'react'
import LogoutIcon from '../../Images/logout.png'
import './Nav.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/Auth'
import { UserContextType } from '../../Types'
import { Button } from '@mui/material'

type Props = {}

const LogoutButton = (props: Props) => {
  const navigate = useNavigate()
  const { token, setToken } = useContext(AuthContext) as UserContextType

  return (
    <div>
      <Button onClick={() => {
          setToken('')
          localStorage.clear()
      }}> 
        <img 
          src={LogoutIcon} 
          width={32} 
          height={32} 
          style={{paddingRight: '15px', paddingLeft: '10px'}} />
                  <div>
          <p className='logout'>Logout</p>
        </div>
      </Button>
    </div>
  )
}

export default LogoutButton
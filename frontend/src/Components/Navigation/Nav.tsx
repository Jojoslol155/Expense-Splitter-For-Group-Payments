import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContextType } from '../../Types'
import { AuthContext } from '../../Context/Auth'
import LogoutButton from './LogoutButton'
import './Nav.css'

const Nav = () => {
  const { token } = useContext(AuthContext) as UserContextType

  return (token && token !== '') ? (
    <div className='navWrapper'>
      <div className='topButtons'>
        <Link className='navButton' to="/"> Home </Link>
        <Link className='navButton' to="/contacts"> Contacts </Link>
        <Link className='navButton' to="/"> Settings </Link>
      </div>
      <div className='logoutButtonWrapper'>
        <LogoutButton />
      </div>
    </div>
  ) : <div></div>
}
export default Nav
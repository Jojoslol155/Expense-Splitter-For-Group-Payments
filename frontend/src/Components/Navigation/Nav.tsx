import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContextType } from '../../Types'
import { AuthContext } from '../../Context/Auth'
import LogoutButton from './LogoutButton'
import ContactIcon from '../../Images/Contact.png'
import './Nav.css'

const Nav = () => {
  const { token, firstName } = useContext(AuthContext) as UserContextType

  return (token && token !== '') ? (
    <div className='navWrapper'>
      <div className='topButtons'>
        <Link className='navButton' to="/"> Home </Link>
        <Link className='navButton' to="/contacts"> Contacts </Link>
        <Link className='navButton' to="/"> Settings </Link>
      </div>
      <div>
        <div className="pfp">
          <img src={ContactIcon} width={32} height={32} className='contactIcon'/>
          <div style={{paddingBottom: "9px"}}>{firstName}</div> 
        </div>
        <div className='logoutButtonWrapper'>
          <LogoutButton />
        </div>
      </div>
    </div>
  ) : <div></div>
}
export default Nav
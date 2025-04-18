import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

type Props = {}

const Nav = (props: Props) => {
  return (
    <div className='navWrapper'>
      <Link className='navButton' to="/"> Home </Link>
      <Link className='navButton' to="/contacts"> Contacts </Link>
      <Link className='navButton' to="/"> Settings </Link>
    </div>
  )
}

export default Nav
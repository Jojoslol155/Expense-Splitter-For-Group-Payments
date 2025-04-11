import React from 'react'
import { User } from '../../Types'
import ContactIcon from '../Images/Contact.png'
import './UserCard.css'

type Props = {
  user: User
}

const UserCard = ({user}: Props) => {
  return (
    <div className='userCardWrapper'>
      <img src={ContactIcon} width={32} height={32}/>
      <div>{user.firstName} {user.lastName} </div>
    </div>
  )
}

export default UserCard
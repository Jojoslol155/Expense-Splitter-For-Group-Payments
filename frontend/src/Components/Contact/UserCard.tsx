import React from 'react'
import { User } from '../../Types'
import ContactIcon from '../../Images/Contact.png'
import './UserCard.css'

type Props = {
  user: User
  addButton: boolean
}

const UserCard = ({user, addButton}: Props) => {
  return (
    <div className='userCardWrapper'>
      <img src={ContactIcon} width={32} height={32} className='contactIcon'/>
      <div className='name'>{user.firstName} {user.lastName} </div>
      {addButton && (
        <> {"+"}
        </>
      )}
    </div>
  )
}

export default UserCard
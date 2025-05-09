import React from 'react'
import { GroupMember, User } from '../../Types'
import ContactIcon from '../../Images/Contact.png'
import './UserCard.css'
import { Button } from '@mui/material'
import MUIButton from '../MUIButton/MUIButton'

type Props = {
  user: User
  addButton: boolean
  addGroupMember?: (groupMember: GroupMember, firstName: string) => void
  expenseGroupID?: number
  closeModal?: () => void
}

const UserCard = ({user, addButton, expenseGroupID, addGroupMember, closeModal}: Props) => {
  return (
    <div className='userCardWrapper'>
      <img src={ContactIcon} width={32} height={32} className='contactIcon'/>
      <div className='name'>{user.firstName} {user.lastName} </div>
      {addButton && (
        <> 
          <MUIButton 
            text={"+"}
            onClick={() => {
              if (expenseGroupID && addGroupMember) {
  
                const newGroupMember: GroupMember = {
                  memberID: user.ID,
                  expenseGroupID: expenseGroupID
                }
                addGroupMember(newGroupMember, user.firstName)
                if (closeModal) {
                  closeModal()
                }
              }
            }}
          />
        </>
      )}
    </div>
  )
}

export default UserCard
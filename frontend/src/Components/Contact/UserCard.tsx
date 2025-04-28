import React from 'react'
import { GroupMember, User } from '../../Types'
import ContactIcon from '../../Images/Contact.png'
import './UserCard.css'
import { Button } from '@mui/material'

type Props = {
  user: User
  addButton: boolean
  addGroupMember?: (groupMember: GroupMember) => void
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
          <Button onClick={() => {
            if (expenseGroupID && addGroupMember) {

              const newGroupMember: GroupMember = {
                memberID: user.ID,
                expenseGroupID: expenseGroupID
              }
              addGroupMember(newGroupMember)
              if (closeModal) {
                closeModal()
              }
            }
          }}> 
            {"+"}
          </Button>
        </>
      )}
    </div>
  )
}

export default UserCard
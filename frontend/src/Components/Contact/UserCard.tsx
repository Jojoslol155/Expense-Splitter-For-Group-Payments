import React from 'react'
import { GroupMember, User, Payment } from '../../Types'
import ContactIcon from '../../Images/Contact.png'
import MUIButton from '../MUIButton/MUIButton'
import Balance from './Balance'
import './UserCard.css'

type Props = {
  user: User
  addButton: boolean
  addGroupMember?: (groupMember: GroupMember, firstName: string) => void
  expenseGroupID?: number
  closeModal?: () => void
  payments?: Payment[]
}

const UserCard = ({user, addButton, expenseGroupID, addGroupMember, closeModal, payments}: Props) => {
  return (
    <div className='userCardWrapper'>
      <div className='headerUser'>
        <img src={ContactIcon} width={32} height={32} className='contactIcon'/>
        <div className='name'>{user.firstName} {user.lastName} </div>
      </div>
      <div>
        <div className='payments'>
          {payments && payments.map(p => {
            return (
              <Balance payment={p}/>
            )
          })}
          </div>
        </div>
      {addButton && (
        <> 
          <MUIButton 
            text={"+"}
            isDisabled={false}
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
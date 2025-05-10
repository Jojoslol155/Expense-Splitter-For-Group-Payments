import React from 'react'
import { GroupMember, User, Payment } from '../../Types'
import ContactIcon from '../../Images/Contact.png'
import './UserCard.css'
import MUIButton from '../MUIButton/MUIButton'
import { formatDollarAmount } from '../../Util/formatting'

type Props = {
  user: User
  addButton: boolean
  addGroupMember?: (groupMember: GroupMember, firstName: string) => void
  expenseGroupID?: number
  closeModal?: () => void
  payments?: Payment[]
}

const UserCard = ({user, addButton, expenseGroupID, addGroupMember, closeModal, payments}: Props) => {
  console.log("get payments?")
  console.log(payments)
  return (
    <div className='userCardWrapper'>
      <img src={ContactIcon} width={32} height={32} className='contactIcon'/>
      <div>
        <div className='name'>{user.firstName} {user.lastName} </div>
        <div className='payments'>
          {payments && payments.map(p => {
            console.log(p)
            return (
              <div>
                {"Owes"} {formatDollarAmount(p.amount)} {"to: "} {p.owedToName}
              </div>
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
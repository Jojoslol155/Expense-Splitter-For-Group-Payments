import React, { useContext, useEffect } from 'react'
import { useGetAllContacts } from '../../Hooks/Users'
import './ViewContacts.css'
import UserCard from '../../Components/Contact/UserCard'
import { AuthContext } from '../../Context/Auth'
import { UserContextType } from '../../Types'

const ViewContacts = () => {
  const [contacts, getContacts] = useGetAllContacts()
  const { userID } = useContext(AuthContext) as UserContextType

  useEffect(() => {
    getContacts()
  }, [])

  return (
    <div className='contactsWrapper'>
      {contacts && contacts.map(c => {
        if (c.ID !== userID) {
          return (<div>
            <UserCard user={c} addButton={false} />
          </div>)
        }
      })}
    </div>
  )
}

export default ViewContacts
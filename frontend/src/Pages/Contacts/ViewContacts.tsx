import React, { useEffect } from 'react'
import { User } from '../../Types'
import { useGetAllContacts } from '../../Hooks/Users'
import './ViewContacts.css'
import UserCard from '../../Components/Contact/UserCard'

const ViewContacts = () => {
  const [contacts, getContacts] = useGetAllContacts()

  useEffect(() => {
    getContacts()
  }, [])

  return (
    <div className='contactsWrapper'>
      {contacts && contacts.map(c => {
        return (<div>
          <UserCard user={c} addButton={false} />
        </div>)
      })}
    </div>
  )
}

export default ViewContacts
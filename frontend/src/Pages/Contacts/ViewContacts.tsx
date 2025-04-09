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
    <div className='contacts-wrapper'>
      {contacts && contacts.map(c => {
        return (<div>
          <UserCard user={c} />
        </div>)
      })}
    </div>
  )
}

export default ViewContacts
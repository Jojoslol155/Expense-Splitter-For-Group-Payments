import React, { useEffect } from 'react'
import { User } from '../../Types'
import { useGetAllContacts } from '../../Hooks/Users'
import './ViewContacts.css'

const ViewContacts = () => {
  const [contacts, getContacts] = useGetAllContacts()

  useEffect(() => {
    getContacts()
  }, [])

  return (
    <div className='contacts-wrapper'>
      {contacts && contacts.map(c => {
        return (<div>
          {c.firstName} {c.lastName}
        </div>)
      })}
    </div>
  )
}

export default ViewContacts
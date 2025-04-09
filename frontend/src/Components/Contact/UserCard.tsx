import React from 'react'
import { User } from '../../Types'

type Props = {
  user: User
}

const UserCard = ({user}: Props) => {
  return (
    <div>{user.firstName} {user.lastName}</div>
  )
}

export default UserCard
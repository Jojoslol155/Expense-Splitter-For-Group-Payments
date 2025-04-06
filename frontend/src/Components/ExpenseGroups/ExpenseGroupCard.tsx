import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    name: string
    groupID: number
}

const ExpenseGroupCard = ({name, groupID}: Props) => {
  return (
    <Link to={`/group/${groupID}/view`}> {name}</Link>
  )
}

export default ExpenseGroupCard
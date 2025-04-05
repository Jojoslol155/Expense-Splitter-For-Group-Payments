import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetExpenseGroup } from '../../Hooks/ExpenseGroups'

function ViewExpenseGroup() {
  const { id } = useParams()
  const [expenseGroup, getExpenseGroup] = useGetExpenseGroup(Number(id))

  useEffect(() => {
    getExpenseGroup()
  }, [])
  return (
    <div>Viewing: {expenseGroup.name}</div>
  )
}

export default ViewExpenseGroup
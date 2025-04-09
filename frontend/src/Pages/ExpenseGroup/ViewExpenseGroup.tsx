import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetExpenseGroup } from '../../Hooks/ExpenseGroups'
import Expense from '../../Components/Expense/Expense'
import { List, Stack } from '@mui/material'
import UserCard from '../../Components/Contact/UserCard'

function ViewExpenseGroup() {
  const { id } = useParams()
  const [expenseGroup, getExpenseGroup] = useGetExpenseGroup(Number(id))

  useEffect(() => {
    getExpenseGroup()
  }, [])
  return (
    <Stack spacing={2}>
      {expenseGroup.name}
      {expenseGroup.expenses && (
        <List>
          {expenseGroup.expenses.map(ex => {
            return <div>
              <Expense name={ex.name} amount={ex.amount}/>
              </div>
          })}
        </List>
      )}
      {expenseGroup.members && (
        <List>
          {expenseGroup.members.map(member => {
            return <div>
              <UserCard user={member} />
            </div>
          })}
        </List>
      )}
    </Stack>
  )
}

export default ViewExpenseGroup
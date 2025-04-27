import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetExpenseGroup } from '../../Hooks/ExpenseGroups'
import ExpenseCard from '../../Components/Expense/ExpenseCard'
import { List, Stack } from '@mui/material'
import UserCard from '../../Components/Contact/UserCard'
import PageHeader from '../../Components/PageHeader'
import SectionHeader from '../../Components/SectionHeader'
import './ViewExpenseGroup.css'

function ViewExpenseGroup() {
  const { id } = useParams()
  const [expenseGroup, getExpenseGroup, dispatch] = useGetExpenseGroup(Number(id))

  useEffect(() => {
    getExpenseGroup()
  }, [])

  return (
    <div className='expenseGroupsWrapper'>
      <Stack spacing={2}>
        <PageHeader header={expenseGroup.name}/>
        <SectionHeader text={"Expenses"}/>
        {expenseGroup.expenses && (
          <List sx={{ paddingLeft: '20px'}}>
            {expenseGroup.expenses.map(ex => {
              return <ExpenseCard expense={ex} dispatch={dispatch} key={ex.ID}/>
            })}
          </List>
        )}
        <SectionHeader text={"Members"}/>
        {expenseGroup.members && (
          <List sx={{ paddingLeft: '35px'}}>
            {expenseGroup.members.map(member => {
              return <div>
                <UserCard user={member} />
              </div>
            })}
          </List>
        )}
      </Stack>
    </div>
  )
}

export default ViewExpenseGroup
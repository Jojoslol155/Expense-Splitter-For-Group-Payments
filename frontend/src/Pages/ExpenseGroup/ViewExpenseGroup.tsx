import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetExpenseGroup } from '../../Hooks/ExpenseGroups'
import Expense from '../../Components/Expense/Expense'
import { List, Stack } from '@mui/material'
import UserCard from '../../Components/Contact/UserCard'
import PageHeader from '../../Components/PageHeader'
import SectionHeader from '../../Components/SectionHeader'
import './ViewExpenseGroup.css'

function ViewExpenseGroup() {
  const { id } = useParams()
  const [expenseGroup, getExpenseGroup] = useGetExpenseGroup(Number(id))

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
              return <div>
                <Expense name={ex.name} amount={ex.amount} memberPercentages={ex.userExpensePercentages}/>
                </div>
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
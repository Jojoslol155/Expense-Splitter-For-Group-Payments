import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetExpenseGroup } from '../../Hooks/ExpenseGroups'
import ExpenseCard from '../../Components/Expense/ExpenseCard'
import { Alert, List, Stack } from '@mui/material'
import { GET_PERCENTAGES_URL } from '../../config'
import UserCard from '../../Components/Contact/UserCard'
import PageHeader from '../../Components/PageHeader'
import SectionHeader from '../../Components/SectionHeader'
import { get } from 'lodash'
import { Expense, MemberPercentage } from '../../Types'
import './ViewExpenseGroup.css'

function ViewExpenseGroup() {
  const { id } = useParams()
  const [expenseGroup, getExpenseGroup, dispatch] = useGetExpenseGroup(Number(id))
  const [ showAlert, setShowAlert ] = useState(false)

  useEffect(() => {
    getExpenseGroup()
  }, [])

  const saveMemberPercentages = async (expense: Expense) => {
    let percentageSum = 0;
    for (let i = 0; i < expense.userExpensePercentages.length; i++) {
      percentageSum = Math.round(percentageSum + expense.userExpensePercentages[i].percentage)
    }
  
    if (percentageSum !== 1) {
      setShowAlert(true)
      return
    }
  
    for (let i = 0; i < expense.userExpensePercentages.length; i++) {
      const options = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: toMemberPercentageReq(expense.userExpensePercentages[i]),
      }
  
        try {
            fetch(GET_PERCENTAGES_URL + `/${get(expense, 'id')}`, options).then(res => {
                if (res.status !== 200) {
                    console.error("error")
                }
  
                return res.json();
            }).then(json => {
                console.log(json)
            })
        } catch(e) {
            console.error(e)
        }
    }
  }
  
  const toMemberPercentageReq = (mp: MemberPercentage) => {
    const json = JSON.stringify(mp)
    console.log(json)
    return json
  }
  

  return (
    <div className='expenseGroupsWrapper'>
      <Stack spacing={2}>
        <PageHeader header={expenseGroup.name}/>
        <SectionHeader text={"Expenses"}/>
        {expenseGroup.expenses && (
          <List sx={{ paddingLeft: '20px'}}>
            {showAlert && <Alert severity='warning' onClose={() => {
              setShowAlert(false)
            }}>
              Percentages must total to 100%
            </Alert>}
            {expenseGroup.expenses.map(ex => {
              return <ExpenseCard expense={ex} dispatch={dispatch} key={ex.ID} saveMemberPercentages={saveMemberPercentages} />
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
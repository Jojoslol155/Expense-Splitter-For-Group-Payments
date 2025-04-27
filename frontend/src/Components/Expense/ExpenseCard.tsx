import React, {Dispatch} from 'react'
import { Accordion, AccordionDetails, AccordionSummary, ListItem, Button } from '@mui/material'
import {formatDollarAmount } from '../../Util/formatting'
import ExpandIcon from '../ExpandIcon/ExpandIcon'
import { GET_PERCENTAGES_URL } from '../../config'
import UserExpensePercentage from '../MemberPercentage/MemberPercentage'
import './ExpenseCard.css'
import { ExpenseGroupFormAction, Expense, MemberPercentage } from '../../Types'
import { get } from 'lodash'

type Props = {
    expense: Expense
    dispatch: Dispatch<ExpenseGroupFormAction>
}

  const putExpense = async (expense: Expense) => {

      // update all UEP first
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

const ExpenseCard = ({expense, dispatch}: Props) => {
  return (
    <ListItem>
      <Accordion sx={{minWidth:'320px'}}>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <div className='expenseHeader'>
            <div className='expenseHeaderElement'>{expense.name}</div>
            <div className='expenseHeaderElement'>{formatDollarAmount(expense.amount)} </div>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{minWidth:'500px'}}>
            {expense.userExpensePercentages.map(p => {
              return (
                <UserExpensePercentage memberPercentage={p} amount={expense.amount} dispatch={dispatch} key={p.expenseID+p.userID}/>
              )})
            }
        </AccordionDetails>
        <div className='buttonWrapper'>
          <Button onClick={() => {
            putExpense(expense)
          }}>Save Changes</Button>
        </div>
      </Accordion>
    </ListItem>
  )
}

const toMemberPercentageReq = (mp: MemberPercentage) => {
  const json = JSON.stringify(mp)
  console.log(json)
  return json
}


export default ExpenseCard
import React, {Dispatch, useContext} from 'react'
import { Accordion, AccordionDetails, AccordionSummary, ListItem, Button, Alert, Typography } from '@mui/material'
import {formatDollarAmount } from '../../Util/formatting'
import ExpandIcon from '../ExpandIcon/ExpandIcon'
import UserExpensePercentage from '../MemberPercentage/MemberPercentage'
import './ExpenseCard.css'
import { ExpenseGroupFormAction, Expense,  ContactsContextType } from '../../Types'
import MUIButton from '../MUIButton/MUIButton'
import { ContactsContext } from '../../Context/Contacts'
import { get } from 'lodash'

type Props = {
    expense: Expense
    saveMemberPercentages: (expense: Expense, setShowAlert: (alert: boolean) => void) => void
    setShowAlert: (alert: boolean) => void
    dispatch: Dispatch<ExpenseGroupFormAction>
  }
  
  const ExpenseCard = ({expense, dispatch, saveMemberPercentages, setShowAlert}: Props) => {
    const { contacts } = useContext(ContactsContext) as ContactsContextType
    const paidByName = () => {
      var name = ""
      contacts.forEach(c => {
        if (c.ID == expense.paidByUserId) {
          name = c.firstName + " " + c.lastName
        }
      })
      return name
    }

    return (
      <ListItem>
        <Accordion sx={{minWidth:'320px'}}>
          <AccordionSummary expandIcon={<ExpandIcon />}>
            <div className='expenseHeader'>
              <div className='expenseHeaderElement'>{expense.name}</div>
              <div className='expenseHeaderElement'>{formatDollarAmount(expense.amount)} </div>
              <div>{"Paid By:"} {paidByName()} </div>
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
            <MUIButton onClick={() => {
              saveMemberPercentages(expense, setShowAlert)
            }} text="Save Changes"/>
          </div>
        </Accordion>
      </ListItem>
    )
}

export default ExpenseCard
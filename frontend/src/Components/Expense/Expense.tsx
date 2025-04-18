import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, ListItem } from '@mui/material'
import {formatDollarAmount } from '../../Util/formatting'
import ExpandIcon from '../ExpandIcon/ExpandIcon'
import UserExpensePercentage from '../MemberPercentage/MemberPercentage'
import './Expense.css'
import { MemberPercentage } from '../../Types'

type Props = {
    name: string
    amount: number
    memberPercentages: MemberPercentage[]
    // dispatch: Dispatch<ExpenseFormAction>
}

const Expense = ({name, amount, memberPercentages}: Props) => {
  return (
    <ListItem>
      <Accordion sx={{minWidth:'320px'}}>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <div className='expenseHeader'>
            <div className='expenseHeaderElement'>{name}</div>
            <div className='expenseHeaderElement'>{formatDollarAmount(amount)} </div>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{minWidth:'500px'}}>
            {memberPercentages.map(p => {
              return (
                <UserExpensePercentage memberPercentage={p} amount={amount} />
              )})
            }
        </AccordionDetails>
      </Accordion>
    </ListItem>
  )
}


export default Expense
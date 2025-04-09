import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, ListItem, ListItemText } from '@mui/material'
import formatDollarAmount from '../../Util/formatDollarAmount'
import ExpandIcon from '../ExpandIcon/ExpandIcon'
import './Expense.css'
import { MemberPercentage } from '../../Types'

type Props = {
    name: string
    amount: number
}

const TestPercentageMap = (): MemberPercentage[] => {
  const percentages: MemberPercentage[] = [{
    expenseID: 1,
    userID: 1,
    percentage: .33,
    userName: "Cassandra"
  }, {
    expenseID: 1,
    userID: 1,
    percentage: .33,
    userName: "Princess"
  }, {
    expenseID: 1,
    userID: 1,
    percentage: .34,
    userName: "Professor"
  }]

  return percentages
}

const Expense = ({name, amount}: Props) => {
  return (
    <ListItem>
      <Accordion sx={{minWidth:'190px'}}>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <div className='expenseHeader'>
            <div>{name}</div>
            <div>{formatDollarAmount(amount)} </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
            {TestPercentageMap().map(p => {
              return (
                <div className='percentageMapWrapper'>
                  <div>{p.userName}</div>
                  <div>{p.percentage}</div>
                </div>
              )})
            }
        </AccordionDetails>
      </Accordion>
    </ListItem>
  )
}

export default Expense
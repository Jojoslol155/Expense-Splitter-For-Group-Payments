import { Accordion, AccordionDetails, AccordionSummary, ListItem, ListItemText } from '@mui/material'
import React from 'react'

type Props = {
    name: string
    amount: number
}

const Expense = ({name, amount}: Props) => {
  return (
    <ListItem>
      <Accordion>
        <AccordionSummary>
          {name}
          {amount}
        </AccordionSummary>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>
    </ListItem>
  )
}

export default Expense
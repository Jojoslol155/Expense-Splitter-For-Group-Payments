import { ListItem, ListItemText } from '@mui/material'
import React from 'react'

type Props = {
    name: string
    amount: number
}

const Expense = ({name, amount}: Props) => {
  return (
    <ListItem>
        {name}
        {amount}
    </ListItem>
  )
}

export default Expense
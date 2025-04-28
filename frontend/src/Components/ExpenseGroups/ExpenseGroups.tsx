import React from 'react'
import { ExpenseGroup } from '../../Types'
import ExpenseGroupCard from './ExpenseGroupCard'
import { Grid } from '@mui/material'

type Props = {
    groups: ExpenseGroup[]
}

const ExpenseGroups = ({groups}: Props) => {
  return (
    <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
        {groups && groups.map((g) => {
            return <ExpenseGroupCard name={g.name} groupID={g.ID} key={g.ID}/>
        })}
    </Grid>
    
  )
}

export default ExpenseGroups
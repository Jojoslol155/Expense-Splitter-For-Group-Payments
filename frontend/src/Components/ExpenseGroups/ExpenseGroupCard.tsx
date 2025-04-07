import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Card, CardContent, CardHeader, Link, CardActionArea } from '@mui/material'

type Props = {
    name: string
    groupID: number
}

const ExpenseGroupCard = ({name, groupID}: Props) => {
  return (
      <Grid size={6}>
        <Card variant='outlined'>
          <CardActionArea component={RouterLink} to={`/group/${groupID}/view`}>
            <CardHeader title={name}/>
            <CardContent>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
  )
}

export default ExpenseGroupCard
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Card, CardContent, CardHeader, Link, CardActionArea } from '@mui/material'

type Props = {
    name: string
    groupID: number
}

function ExpenseGroupCard({name, groupID}: Props) {

  const truncateTitle = () => {
    return name.length > 17 ? name.substring(0, 16).trim() + "..." : name
  }

  return (
        <Card variant='outlined' sx={{ minWidth: 250 }}>
          <CardActionArea component={RouterLink} to={`/group/${groupID}/view`}>
            <CardHeader title={truncateTitle()}/>
            <CardContent>
            </CardContent>
          </CardActionArea>
        </Card>
  )
}

export default ExpenseGroupCard
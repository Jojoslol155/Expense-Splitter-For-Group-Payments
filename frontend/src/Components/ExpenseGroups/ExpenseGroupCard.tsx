import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Card, CardContent, CardHeader, Link } from '@mui/material'

type Props = {
    name: string
    groupID: number
}

const ExpenseGroupCard = ({name, groupID}: Props) => {
  return (
      <Grid size={6}>
        <Card variant='outlined'>
          <CardContent>
            <Link component={RouterLink} to={`/group/${groupID}/view`}> 
              {name}
            </Link>
          </CardContent>
        </Card>
      </Grid>
  )
}

export default ExpenseGroupCard
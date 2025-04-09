import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

type Props = {
    header: string
}

const PageHeader = ({header}: Props) => {
  return (
    <Box>
        <Typography variant='h3'>{header}</Typography>
        <Divider sx={{ background: 'var(--secondary)' }} />
    </Box>
  )
}

export default PageHeader
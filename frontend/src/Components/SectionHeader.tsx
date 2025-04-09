import React from 'react'
import { Box, Divider, Typography } from '@mui/material'

type Props = {
    text: string
}

const SectionHeader = ({text}: Props) => {
  return (
    <Box>
        <Typography variant='h5'>{text}</Typography>
    </Box>
  )
}

export default SectionHeader
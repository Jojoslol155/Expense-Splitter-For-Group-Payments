import React from 'react'
import { Box, Button, ButtonGroup, Divider, Typography } from '@mui/material'
import './ViewExpenseGroup.css'

type Props = {
    header: string
    setOpenModal: (isOpen: boolean) => void
}

const PageHeader = ({header, setOpenModal}: Props) => {
  return (
    <Box>
        <div className='pageHeaderWrapper'>
          <Typography variant='h3'>{header}</Typography>
          <div>
            <ButtonGroup>
              <Button>Edit</Button>
              <Button onClick={() => {
                setOpenModal(true)
              }}>Delete</Button>
            </ButtonGroup>
          </div>
        </div> 
        <Divider sx={{ background: 'var(--secondary)' }} />
    </Box>
  )
}

export default PageHeader
import React from 'react'
import { Box, Button, ButtonGroup, Divider, Typography } from '@mui/material'
import './ViewExpenseGroup.css'
import MUIButton from '../../Components/MUIButton/MUIButton'

type Props = {
    header: string
    setOpenDeleteModal: (isOpen: boolean) => void
}

const PageHeader = ({header, setOpenDeleteModal}: Props) => {
  return (
    <Box>
        <div className='pageHeaderWrapper'>
          <Typography variant='h3'>{header}</Typography>
          <div>
            <ButtonGroup>
              <MUIButton onClick={() => {}} text='Edit'/>
              <MUIButton 
                onClick={() => {
                setOpenDeleteModal(true)
              }}
                text='Delete'
              />
            </ButtonGroup>
          </div>
        </div> 
        <Divider sx={{ background: 'var(--secondary)' }} />
    </Box>
  )
}

export default PageHeader
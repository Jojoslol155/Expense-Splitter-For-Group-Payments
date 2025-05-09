import React, { useEffect } from 'react'

import { Grid } from '@mui/material'

import { ExpenseGroup } from '../../Types'
import { Box, Button, ButtonGroup, Divider, Typography } from '@mui/material'
import MUIButton from '../MUIButton/MUIButton'

type Props = {
    setOpen: (isOpen: boolean) => void
}
export const  AddNew = ({ setOpen }: Props) => {

    return (
        <Box>
            <div className='Dashboard'>
                <MUIButton onClick={() => {
                    setOpen(true)
                }} text={"Create New"}/>
            </div>
            <Divider sx={{ background: 'var(--secondary)', marginTop: '10px', marginBottom: '20px' }} />
        </Box>
    );
}
export default AddNew;
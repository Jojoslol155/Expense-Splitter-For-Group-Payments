import React, { useEffect } from 'react'

import { Grid } from '@mui/material'

import { ExpenseGroup } from '../../Types'
import { Box, Button, ButtonGroup, Divider, Typography } from '@mui/material'

type Props = {
    
    setOpen: (isOpen: boolean) => void
}
export const  AddNew = ({ setOpen }: Props) => {
    useEffect(() => {
        console.log('addbox');

    }, []);
    return (
        <Box>
            <div className='Dashbaoard'>
                <Typography variant='h3'>{ }</Typography>
                <div>
                    <ButtonGroup>
                        <Button onClick={() => {
                            setOpen(true)
                        }}>Create New</Button>
                    </ButtonGroup>
                </div>
            </div>
            <Divider sx={{ background: 'var(--secondary)' }} />
        </Box>
    );
}
export default AddNew;
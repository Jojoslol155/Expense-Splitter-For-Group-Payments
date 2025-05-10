import React, { useState} from 'react'
import { Modal, TextField, Box, createTheme, ThemeProvider, Button } from '@mui/material'
import MUIButton from '../MUIButton/MUIButton'
import { defaultExpenseForm } from '../../Reducers/createExpenseGroupForm'
import { updateExpense } from '../../Services'
import { EditExpenseForm } from '../../Types'

type Props = {
    open: boolean
    onClose: () => void
    expenseID: number
    name: string
    amount: number
}


const theme = createTheme({
    palette: {
        primary: {
            main: "#206BC4"
        },
        mode: 'dark'
    }
})

 const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    color: 'var(--text)',
    backgroundColor: '#1B2437',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }


const EditExpenseModal = ({open, onClose, expenseID, name, amount}: Props) => {
    const defaultExpense: EditExpenseForm = {
        name, amount
    }
    const [ expenseForm, setExpenseForm ] = useState(defaultExpense)
  return (
    <ThemeProvider theme={theme}>
    <Modal open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={onClose}> 
        <Box sx={style}>
        <TextField
            value={expenseForm.name}
            label={"Expense Title"}
            id="filled-required"
            variant="filled"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                event.preventDefault()
                setExpenseForm({...expenseForm, name: event.target.value})
            }} />
            <TextField 
            value={expenseForm.amount}
            label={"Amount"}
            type="number"
            id="filled-required"
            variant="filled"
            sx={{marginTop:'15px'}}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                event.preventDefault()
                setExpenseForm({...expenseForm, amount: event.target.valueAsNumber})
            }}
            />

            <div style={{display: 'flex', justifyContent: 'flex-end', width:'100%', marginTop:'15px'}}>
            <MUIButton isDisabled={false} onClick={() => {
                onClose()
            }}
            text="Cancel"
            />
            <Button variant='contained' disabled={(expenseForm.amount <= 0 || expenseForm.name == "" )} 
                sx={{marginLeft:'10px'}}
                onClick={() => {
                    onClose()
                    updateExpense(expenseForm, expenseID)
                }}>{"Submit"}</Button>
            </div>
        </Box>
    </Modal>
    </ThemeProvider>
  )
}

export default EditExpenseModal
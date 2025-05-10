import React, { useEffect, useState, useContext} from 'react'
import './Dashboard.css'
import { useGetAllExpenseGroups } from '../../Hooks/ExpenseGroups'
import ExpenseGroups from '../../Components/ExpenseGroups/ExpenseGroups'
import AddNew from '../../Components/AddNew/AddNew'
import { Modal, Box, Typography, TextField, createTheme, ThemeProvider, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {createExpenseGroup} from '../../Services'
import { CreateExpenseGroupForm, UserContextType } from '../../Types'
import MUIButton from '../../Components/MUIButton/MUIButton'
import { AuthContext } from '../../Context/Auth'

function Dashboard() {
  const [expenseGroups, getExpenseGroups] = useGetAllExpenseGroups()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const { userID } = useContext(AuthContext) as UserContextType
  const navigate = useNavigate()
    
  useEffect(() => {
    getExpenseGroups()
  }, [])

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "var(--primary)",
        color: "var(--text)",
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'space-between',
        minHeight: '180px'
    }

    const darkTheme = createTheme({
      palette: {
        mode: 'dark'
      }
    })



  return (
    <div className='dashboardWrapper'>
      <div className='dashboardHeader'>
        <Typography variant='h3'>{"$plit"}</Typography>
        <AddNew setOpen={setOpen} />
      </div>
      <Divider sx={{ background: 'var(--primary)', marginTop: '10px', marginBottom: '20px', padding: '3px' }} />
        <ExpenseGroups groups={expenseGroups} />
        <ThemeProvider theme={darkTheme}>
          <Modal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
              <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                      {"Create a new expense group:"}
                  </Typography>
                  <TextField
                      value={name}
                      label={"name"}
                      id="filled-required"
                      variant="filled"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          event.preventDefault()
                          setName(event.target.value)
                      }} />
                  <MUIButton
                    isDisabled={name == ""} 
                    onClick={() => {
                      const newExpenseGroup: CreateExpenseGroupForm = {
                          name
                      }
                    createExpenseGroup(newExpenseGroup,userID,navigate)
                      setOpen(false);
                      navigate("/") 
                  }}
                  text="Add"
                  />
              </Box>
          </Modal>
        </ThemeProvider>
    </div>
  )
}

export default Dashboard;

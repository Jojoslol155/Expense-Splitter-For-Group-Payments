import React, { useEffect, useState} from 'react'
import './Dashboard.css'
import { useGetAllExpenseGroups } from '../../Hooks/ExpenseGroups';
import ExpenseGroups from '../../Components/ExpenseGroups/ExpenseGroups';
import AddNew from '../../Components/AddNew/AddNew';
import { Modal, Box, Typography, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {createExpenseGroup} from '../../Services'

import { CreateExpenseGroupForm } from '../../Types';
import MUIButton from '../../Components/MUIButton/MUIButton';

function Dashboard() {
  const [expenseGroups, getExpenseGroups] = useGetAllExpenseGroups();
  const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
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
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };



  return (
    <div className='dashboardWrapper'>
          <AddNew setOpen={setOpen} />
          
         <ExpenseGroups groups={expenseGroups} />
          
          <Modal
              open={open}
              onClose={() => {
                  setOpen(false)
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
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
                  onClick={() => {
                    const newExpenseGroup: CreateExpenseGroupForm = {
                        name
                    }
                    createExpenseGroup(newExpenseGroup,navigate)
                      setOpen(false);
                      navigate("/") 
                  }}
                  text="Add"
                  />
              </Box>
          </Modal>
    </div>
  );
}

export default Dashboard;

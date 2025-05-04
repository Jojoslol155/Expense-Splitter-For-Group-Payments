import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetExpenseGroup } from '../../Hooks/ExpenseGroups'
import ExpenseCard from '../../Components/Expense/ExpenseCard'
import { Alert, List, Modal, Stack, Box, Typography, Button } from '@mui/material'
import UserCard from '../../Components/Contact/UserCard'
import PageHeader from './ExpenseGroupPageHeader'
import SectionHeader from '../../Components/SectionHeader'
import { get } from 'lodash'
import { useGetAllContacts } from '../../Hooks/Users'
import { useNavigate } from 'react-router-dom'
import { deleteExpenseGroup, addGroupMember, saveMemberPercentages } from '../../Services'
import './ViewExpenseGroup.css'

function ViewExpenseGroup() {
  const { id } = useParams()
  const [expenseGroup, getExpenseGroup, dispatch] = useGetExpenseGroup(Number(id))
  const [ showAlert, setShowAlert ] = useState(false)
  const [ openDeleteModal, setOpenDeleteModal ] = useState(false)
  const [ openNewMemberModal, setOpenNewMemberModal ] = useState(false)
  const navigate = useNavigate()
  const [contacts, getContacts] = useGetAllContacts()

  useEffect(() => {
    getExpenseGroup()
  }, [])

  
  useEffect(() => {
    getContacts()
  }, [])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#041010',
    color: '#DEF7F7',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  

  return (
    <div className='expenseGroupsWrapper'>
      <Stack spacing={2}>
        <PageHeader header={expenseGroup.name} setOpenDeleteModal={setOpenDeleteModal}/>
        <SectionHeader text={"Expenses"}/>
        {expenseGroup.expenses && (
          <List sx={{ paddingLeft: '20px'}}>
            {showAlert && <Alert severity='warning' onClose={() => {
              setShowAlert(false)
            }}>
              Percentages must total to 100%
            </Alert>}
            <Modal open={openDeleteModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              onClose={() => {
                setOpenDeleteModal(false)
              }}>
              <Box sx={style}>
                <Typography variant="h6">
                  {"Are you sure you want to delete?"}
                </Typography>
                <Button onClick={() => {
                  deleteExpenseGroup(expenseGroup, navigate)
                }}>
                  Delete
                </Button>
                <Button onClick={() => {
                  setOpenDeleteModal(false)
                }}>
                  Cancel
                </Button>
              </Box>
            </Modal>
            <Modal open={openNewMemberModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              onClose={() => {
                setOpenNewMemberModal(false)
              }}>
              <Box sx={style}>
                <Typography variant="h6">
                  {"Add a new member"}
                </Typography>
                <>
                  {
                    contacts.filter(c => {
                      let memberFound = false
                      expenseGroup.members.forEach(m => {
                        if (get(m, 'id') == get(c, 'ID')) {
                          memberFound = true
                        }
                      })
                      if (!memberFound) {
                        return c
                      }
                    }).map(c => {
                        return (<>
                          <UserCard user={c} 
                            addButton={true} 
                            expenseGroupID={expenseGroup.ID} 
                            addGroupMember={addGroupMember} 
                            closeModal={() => {
                              setOpenNewMemberModal(false)
                            }}
                            key={c.ID} />
                        </>
                        )
                      })
                  }
                </>
                <Button onClick={() => {
                  setOpenNewMemberModal(false)
                }}>
                  Done
                </Button>
              </Box>
            </Modal>
            {expenseGroup.expenses.map(ex => {
              return <ExpenseCard expense={ex} dispatch={dispatch} key={ex.ID + "c"} saveMemberPercentages={saveMemberPercentages} setShowAlert={setShowAlert} />
            })}
          </List>
        )}
        <SectionHeader text={"Members"}/>
        {expenseGroup.members && (
          <>
            <List sx={{ paddingLeft: '35px'}}>
              {expenseGroup.members.map(member => {
                return <div key={member.ID + member.firstName}>
                  <UserCard user={member} addButton={false} key={member.ID} />
                </div>
              })}
            </List>
            <Button style={{width:'200px'}} onClick={() => {
              setOpenNewMemberModal(true)
              }}>
              Add new
            </Button>
            </>
        )}
      </Stack>
    </div>
  )
}



export default ViewExpenseGroup
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetExpenseGroup } from '../../Hooks/ExpenseGroups'
import ExpenseCard from '../../Components/Expense/ExpenseCard'
import { Alert, List, Modal, Stack, Box, Typography, TextField } from '@mui/material'
import UserCard from '../../Components/Contact/UserCard'
import PageHeader from './ExpenseGroupPageHeader'
import SectionHeader from '../../Components/SectionHeader'
import { get } from 'lodash'
import { useGetAllContacts } from '../../Hooks/Users'
import { useNavigate } from 'react-router-dom'
import { deleteExpenseGroup, addGroupMember, saveMemberPercentages, createExpense } from '../../Services'
import './ViewExpenseGroup.css'
import MUIButton from '../../Components/MUIButton/MUIButton'
import { ExpenseForm, UserContextType, BalanceDictionary } from '../../Types'
import { AuthContext } from '../../Context/Auth'
import { defaultExpenseForm } from '../../Reducers/createExpenseGroupForm'

interface AmountsOwed {[OwedFromID: string] : number}

function ViewExpenseGroup() {
  const { id } = useParams()
  const [expenseGroup, getExpenseGroup, dispatch] = useGetExpenseGroup(Number(id))
  const [ showAlert, setShowAlert ] = useState(false)
  const [ openDeleteModal, setOpenDeleteModal ] = useState(false)
  const [ openNewMemberModal, setOpenNewMemberModal ] = useState(false)
  const [ openNewExpenseModal, setOpenNewExpenseModal] = useState(false)
  const [ expenseForm, setExpenseForm ] = useState(defaultExpenseForm)
  const navigate = useNavigate()
  const [contacts, getContacts] = useGetAllContacts()
  const { firstName, userID } = useContext(AuthContext) as UserContextType
  const [ balances, setBalances ] = useState<BalanceDictionary>({}) 
  
  useEffect(() => {
    getExpenseGroup()
  }, [])

  useEffect(() => {
    getContacts()
  }, [])

  useEffect(() => {
    getAmountsOwed()
  }, [expenseGroup])
  
  const handleSubmit = () => {
    createExpense(expenseForm, expenseGroup.ID, expenseGroup.members)
    setTimeout(() => {
      getExpenseGroup()
    }, 400)
    
    //getExpenseGroup()
  }


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const getAmountsOwed = () => {
    // simple map of ID to sum of amount OWED, local only
    var amountsOwed: AmountsOwed = {}

    expenseGroup.expenses.forEach(exp => {
      exp.userExpensePercentages.forEach(uep => {

        if (!amountsOwed[uep.userID]) {
          amountsOwed[uep.userID] = 0
        }

        const amount = exp.amount * uep.percentage

        amountsOwed[uep.userID] += amount
      })
    })

    console.log(amountsOwed)
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
                <MUIButton onClick={() => {
                  deleteExpenseGroup(expenseGroup, navigate)
                }} text={"Delete"}/>
                <MUIButton onClick={() => {
                  setOpenDeleteModal(false)
                }} text={"Cancel"}/>
              </Box>
            </Modal>
            <Modal open={openNewExpenseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              onClose={() => {
                setOpenNewExpenseModal(false)
              }}> 
                <Box sx={style}>
                  <TextField
                      value={expenseForm.name}
                      label={"name"}
                      id="filled-required"
                      variant="filled"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          event.preventDefault()
                          setExpenseForm({...expenseForm, name: event.target.value})
                      }} />
                      <TextField 
                        value={expenseForm.amount}
                        label={"amount"}
                        type="number"
                        id="filled-required"
                        variant="filled"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          event.preventDefault()
                          setExpenseForm({...expenseForm, amount: event.target.valueAsNumber})
                        }}
                      />
                <MUIButton onClick={() => {
                  setOpenNewExpenseModal(false)
                  handleSubmit()
                }}
                  text={"Add"}
                />
                <MUIButton onClick={() => {
                  setOpenNewExpenseModal(false)
                }}
                  text="Cancel"
                />
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
                <MUIButton onClick={() => {
                  setOpenNewMemberModal(false)
                }} text={"Done"}/>
              </Box>
            </Modal>
            {expenseGroup.expenses.map(ex => {
              return <ExpenseCard expense={ex} dispatch={dispatch} key={get(ex, "id") + "c"} saveMemberPercentages={saveMemberPercentages} setShowAlert={setShowAlert} />
            })}
          </List>
        )}
          <div>
            <MUIButton onClick={() => {
              setOpenNewExpenseModal(true)
            }}
              text="Add new expense"
            />
          </div>
        <SectionHeader text={"Members"}/>
        {expenseGroup.members && (
          <>
            <List sx={{ paddingLeft: '35px'}}>
              {expenseGroup.members.map(member => {
                return <div key={member.ID + member.firstName}>
                  <UserCard 
                    //balances={balances[member.ID]}
                    user={member} 
                    addButton={false} 
                    key={member.ID} />
                </div>
              })}
            </List>
            <div>
              <MUIButton onClick={() => {
                setOpenNewMemberModal(true)
                }}
                text="Add new member"
              />
            </div>
            </>
        )}
      </Stack>
    </div>
  )
}



export default ViewExpenseGroup
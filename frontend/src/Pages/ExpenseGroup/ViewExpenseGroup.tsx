import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetExpenseGroup } from '../../Hooks/ExpenseGroups'
import ExpenseCard from '../../Components/Expense/ExpenseCard'
import { Alert, List, Modal, Stack, Box, Typography, TextField, Select, MenuItem, InputLabel, ButtonGroup } from '@mui/material'
import UserCard from '../../Components/Contact/UserCard'
import PageHeader from './ExpenseGroupPageHeader'
import SectionHeader from '../../Components/SectionHeader'
import { get } from 'lodash'
import { useGetAllContacts } from '../../Hooks/Users'
import { useNavigate } from 'react-router-dom'
import { deleteExpenseGroup, addGroupMember, saveMemberPercentages, createExpense } from '../../Services'
import './ViewExpenseGroup.css'
import MUIButton from '../../Components/MUIButton/MUIButton'
import { UserContextType, PaymentDictionary, GroupMember } from '../../Types'
import { AuthContext } from '../../Context/Auth'
import { defaultExpenseForm } from '../../Reducers/createExpenseGroupForm'
import AddNew from '../../Components/AddNew/AddNew'

interface Balances {[UserID: string] : number}

const compareBalances = (a: [string, number], b: [string, number]) => {
  if (a[1] === b[1]) {
    return 0
  }
  return (a[1] < b[1]) ? -1 : 1
}

function ViewExpenseGroup() {
  const { id } = useParams()
  const [expenseGroup, getExpenseGroup, dispatch] = useGetExpenseGroup(Number(id))
  const [ showAlert, setShowAlert ] = useState(false)
  const [ openDeleteModal, setOpenDeleteModal ] = useState(false)
  const [ openNewMemberModal, setOpenNewMemberModal ] = useState(false)
  const [ openNewExpenseModal, setOpenNewExpenseModal] = useState(false)
  const [ expenseForm, setExpenseForm ] = useState(defaultExpenseForm)
  const [ memberToAdd, setMemberToAdd ] = useState('')
  const navigate = useNavigate()
  const [contacts, getContacts] = useGetAllContacts()
  const { firstName, userID } = useContext(AuthContext) as UserContextType
  const [ amountsOwed, setAmountsOwed ] = useState<Balances>({})
  const [ payments, setPayments ] = useState<PaymentDictionary>({}) 
  
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
    display: 'flex',
    flexDirection: 'column',
    
  }

  const getNameForId = (id: string): string => {
    let name = ""
    contacts.forEach(c => {
      if (c.ID == id) {
        name = c.firstName + " " + c.lastName
      }
    })
    return name
  }

  const getAmountsOwed = () => {
    // simple map of ID to sum of amount OWED TO/FROM that ID, local only
    // go through expenses and get amounts from the expenses wehre they are the paid for ID
    // that SUBTRACTS from the amount
    // then go through the user expense percentages and get the amount from that value
    // ADD that to the amount for this user
    // at the end, some will have negative (money owed TO them) or positive (THEY owe money to the pool)
    var amtsOwed: Balances = {}

    expenseGroup.expenses.forEach(exp => {
      contacts.forEach(c => {
        if(c.ID == exp.paidByUserId) {
          if (!amtsOwed[c.ID]) {
            amtsOwed[c.ID] = 0
          }
          amtsOwed[c.ID] -= exp.amount
        }
      })

      exp.userExpensePercentages.forEach(uep => {
        if(!amtsOwed[uep.userID]) {
          amtsOwed[uep.userID] = 0
        }

        amtsOwed[uep.userID] += (exp.amount * uep.percentage)
      })
    })

    setAmountsOwed(amtsOwed)

    // turn dictionary into an array of key value tuples
    // then we can sort by the balance amount
    var balancesArray: any = []

    Object.entries(amtsOwed).map((kv) => {
      balancesArray.push(kv)
    })

    console.log(balancesArray.sort(compareBalances))

    // now we can turn this balances array into payment pairs
    // as long as the length is greater than 2, take the max and the min and pair them up in the form 
    // of a payment
    // if someone's amount totals to 0, remove them and increment the index
    let i = 0
    while (balancesArray.length > 0) { //balancesArray.length > 0
      console.log(i)
      console.log(balancesArray)
      var min: number = balancesArray[0][1]
      var minName = getNameForId(balancesArray[0][0])
      var max: number = balancesArray[balancesArray.length - 1][1]
      var maxName = getNameForId(balancesArray[balancesArray.length - 1][0])


      if (min + max > 0) {
        balancesArray[balancesArray.length - 1][1] = max + min
        balancesArray.shift()
        console.log(maxName + " pays " + minName + min)

      } else if (min + max < 0) {
        balancesArray[0][1] = balancesArray[0][1] + [balancesArray.length - 1][1]
        balancesArray.pop()
        console.log(maxName + " pays " + minName + max)
      } else {
        balancesArray.shift()
        balancesArray.pop()
        console.log(maxName + " pays " + minName + min)
      }
      i++
      console.log(balancesArray)
    }

    
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      event.preventDefault()
                      setExpenseForm({...expenseForm, amount: event.target.valueAsNumber})
                    }}
                  />
                  <InputLabel>Paid By</InputLabel>
                  <Select value={expenseForm.paidByUserId}
                      onChange={(e) => {
                        setExpenseForm({...expenseForm, paidByUserId: e.target.value})
                      }}>
                    {expenseGroup.members.map(member => {
                      var memberID = ""+ get(member, 'id') 
                      return (
                        <MenuItem value={memberID}>
                            {member.firstName} {" "} {member.lastName}
                        </MenuItem>)
                    })}
                  </Select>
                  <ButtonGroup>
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
                  </ButtonGroup>
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
                <Select value={memberToAdd} label={"Contact name"}
                  onChange={(e) => {
                    setMemberToAdd(e.target.value)
                  }}>
                  {
                    contacts.filter((c) => {
                      let memberFound = false
                      expenseGroup.members.forEach(m => {
                        if (get(m, 'id') == get(c, 'ID')) {
                          memberFound = true
                        }
                      })
                      if (!memberFound) {
                        return c
                      }
                    }).map((c) => {
                    if (c.ID !== userID) {
                      return (
                        <MenuItem value={c.ID}>{c.firstName} {" "} {c.lastName} </MenuItem>
                      )
                    }
                  })}
                </Select>
                </>
                <MUIButton onClick={() => {
                  const gm: GroupMember = {
                    expenseGroupID: expenseGroup.ID,
                    memberID: memberToAdd
                  }
                  const firstNameToAdd = () => {
                    contacts.forEach(c => {
                      if (c.ID == memberToAdd) {
                        return c.firstName
                      }
                    })
                    return ""
                  }
                  if(memberToAdd !== "") {
                    addGroupMember(gm, firstNameToAdd())
                  }
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
            <AddNew setOpen={setOpenNewExpenseModal}/>
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
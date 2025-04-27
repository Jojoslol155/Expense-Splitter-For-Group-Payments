import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetExpenseGroup } from '../../Hooks/ExpenseGroups'
import ExpenseCard from '../../Components/Expense/ExpenseCard'
import { Alert, List, Modal, Stack, Box, Typography, Button } from '@mui/material'
import { GET_PERCENTAGES_URL, GET_EXPENSE_GROUPS_URL, GET_EXPENSES_URL } from '../../config'
import UserCard from '../../Components/Contact/UserCard'
import PageHeader from './ExpenseGroupPageHeader'
import SectionHeader from '../../Components/SectionHeader'
import { get } from 'lodash'
import { Expense, MemberPercentage } from '../../Types'
import { useNavigate } from 'react-router-dom'
import './ViewExpenseGroup.css'

function ViewExpenseGroup() {
  const { id } = useParams()
  const [expenseGroup, getExpenseGroup, dispatch] = useGetExpenseGroup(Number(id))
  const [ showAlert, setShowAlert ] = useState(false)
  const [ openModal, setOpenModal ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getExpenseGroup()
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

  const deleteExpenseGroup = async () => {
    const options = {
      method: 'DELETE',
      headers: { 
        'Content-type': 'application/json',
      }
    }
    // delete all expenses first
    try {
      const expenses = expenseGroup.expenses

      for (let i = 0; i < expenses.length; i++) {
        const exp = expenses[i]
        const expenseID = get(exp, 'id')

        fetch(GET_EXPENSES_URL + `/${expenseID}`, options).then(res => {
          return res
        }).then(() => {
          fetch(GET_EXPENSE_GROUPS_URL + `/${expenseGroup.ID}`, options).then(res => {
            console.log("fetching?")
            console.log(res)
            if (res.status !== 204) {
              // setStatus(StatusType.ERROR)
              console.error("error: ", res.statusText)
              // throw new Error("Could not create new World State")
          }
            console.log(res)
            return res
          })
        })
      }
    } catch(e) {
      console.error(e)
    }

    navigate('/')
  }

  const saveMemberPercentages = async (expense: Expense) => {
    let percentageSum = 0;
    for (let i = 0; i < expense.userExpensePercentages.length; i++) {
      percentageSum = Math.round(percentageSum + expense.userExpensePercentages[i].percentage)
    }
  
    if (percentageSum !== 1) {
      setShowAlert(true)
      return
    }
  
    for (let i = 0; i < expense.userExpensePercentages.length; i++) {
      const options = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: toMemberPercentageReq(expense.userExpensePercentages[i]),
      }
  
        try {
            fetch(GET_PERCENTAGES_URL + `/${get(expense, 'id')}`, options).then(res => {
                if (res.status !== 200) {
                    console.error("error")
                }
  
                return res.json();
            }).then(json => {
                console.log(json)
            })
        } catch(e) {
            console.error(e)
        }
    }
  }
  
  const toMemberPercentageReq = (mp: MemberPercentage) => {
    const json = JSON.stringify(mp)
    console.log(json)
    return json
  }
  

  return (
    <div className='expenseGroupsWrapper'>
      <Stack spacing={2}>
        <PageHeader header={expenseGroup.name} setOpenModal={setOpenModal}/>
        <SectionHeader text={"Expenses"}/>
        {expenseGroup.expenses && (
          <List sx={{ paddingLeft: '20px'}}>
            {showAlert && <Alert severity='warning' onClose={() => {
              setShowAlert(false)
            }}>
              Percentages must total to 100%
            </Alert>}
            <Modal open={openModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              onClose={() => {
                setOpenModal(false)
            }}>
              <Box sx={style}>
                <Typography variant="h6">
                  {"Are you sure you want to delete?"}
                </Typography>
                <Button onClick={() => {
                  deleteExpenseGroup()
                }}>
                  Delete
                </Button>
                <Button onClick={() => {
                  setOpenModal(false)
                }}>
                  Cancel
                </Button>
              </Box>
                
            </Modal>
            {expenseGroup.expenses.map(ex => {
              return <ExpenseCard expense={ex} dispatch={dispatch} key={ex.ID} saveMemberPercentages={saveMemberPercentages} />
            })}
          </List>
        )}
        <SectionHeader text={"Members"}/>
        {expenseGroup.members && (
          <List sx={{ paddingLeft: '35px'}}>
            {expenseGroup.members.map(member => {
              return <div>
                <UserCard user={member} />
              </div>
            })}
          </List>
        )}
      </Stack>
    </div>
  )
}



export default ViewExpenseGroup
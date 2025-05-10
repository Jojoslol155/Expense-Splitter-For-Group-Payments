import React, {Dispatch, useContext, useState} from 'react'
import { Accordion, AccordionDetails, AccordionSummary, ButtonGroup, Icon, IconButton, ListItem } from '@mui/material'
import { Delete, Check, Edit } from '@mui/icons-material'
import {formatDollarAmount } from '../../Util/formatting'
import ExpandIcon from '../ExpandIcon/ExpandIcon'
import UserExpensePercentage from '../MemberPercentage/MemberPercentage'
import { ExpenseGroupFormAction, Expense,  ContactsContextType } from '../../Types'
import MUIButton from '../MUIButton/MUIButton'
import { ContactsContext } from '../../Context/Contacts'
import './ExpenseCard.css'
import { get } from 'lodash'
import EditExpenseModal from '../Modals/EditExpenseModal'

type Props = {
    expense: Expense
    saveMemberPercentages: (expense: Expense, setShowAlert: (alert: boolean) => void) => void
    setShowAlert: (alert: boolean) => void
    dispatch: Dispatch<ExpenseGroupFormAction>
    openDeleteExpenseModal: () => void
    refresh: () => void
  }
  
  const ExpenseCard = ({expense, dispatch, saveMemberPercentages, setShowAlert, openDeleteExpenseModal, refresh}: Props) => {
    const { contacts } = useContext(ContactsContext) as ContactsContextType
    const [ openEditExpenseModal, setOpenEditExpenseModal] = useState(false)
    const paidByName = () => {
      var name = ""
      contacts.forEach(c => {
        if (c.ID == expense.paidByUserId) {
          name = c.firstName + " " + c.lastName
        }
      })
      return name
    }

    return (
      <>
      <ListItem>
      <EditExpenseModal 
        expenseID={get(expense, 'id', 0)} 
        refresh={refresh}
        name={expense.name}
        amount={expense.amount}
        open={openEditExpenseModal} onClose={() => {
        setOpenEditExpenseModal(false)
      }}/>
        <Accordion sx={{minWidth:'320px', backgroundColor: 'var(--primary)', color: 'var(--text)'}}>
          <AccordionSummary expandIcon={<ExpandIcon />}>
            <div className='expenseHeader'>
              <div className='expenseHeaderElement'>{expense.name}</div>
              <div className='expenseHeaderElement'>{formatDollarAmount(expense.amount)} </div>
              <IconButton onClick={() => {
                setOpenEditExpenseModal(true)
              }}>
                <Edit />
              </IconButton>
            </div>
          </AccordionSummary>
          <AccordionDetails sx={{minWidth:'500px'}}>
              <div className='paidBy'>{"Paid By:"} {paidByName()} </div>
              {expense.userExpensePercentages.map(p => {
                return (
                  <UserExpensePercentage memberPercentage={p} amount={expense.amount} dispatch={dispatch} key={p.expenseID+p.userID}/>
                )})
              }
          </AccordionDetails>
          <div className='buttonWrapper'>
            <div style={{paddingRight: '15px', paddingBottom: '10px'}}>
              <ButtonGroup>
                <MUIButton isDisabled={false} startIcon={<Delete  />} onClick={openDeleteExpenseModal} text={"Delete"}/>
                <MUIButton isDisabled={false} startIcon={<Check />} onClick={() => {
                  saveMemberPercentages(expense, setShowAlert)
                }} text="Save Changes"/>
              </ButtonGroup>
            </div>
          </div>
        </Accordion>
      </ListItem>
      </>
    )
}

export default ExpenseCard
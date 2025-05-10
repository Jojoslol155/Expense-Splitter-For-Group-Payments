import React, { useContext, useEffect, useState } from 'react'
import { useGetAllContacts } from '../../Hooks/Users'
import './ViewContacts.css'
import UserCard from '../../Components/Contact/UserCard'
import { AuthContext } from '../../Context/Auth'
import { UserContextType } from '../../Types'
import { Divider, Typography } from '@mui/material'
import { PaymentDictionary } from '../../Types'
import { ExpenseGroupsContext } from '../../Context/ExpenseGroups'
import { ExpenseGroupsContextType, Balances, Payment } from '../../Types'
import {compareBalances, getNameForId} from '../../Util/Payments'
import { get } from 'lodash'

const ViewContacts = () => {
  const [contacts, getContacts] = useGetAllContacts()
  const { userID } = useContext(AuthContext) as UserContextType
  const { expenseGroups } = useContext(ExpenseGroupsContext) as ExpenseGroupsContextType
  const [ payments, setPayments ] = useState<PaymentDictionary>({}) 
  const [ amountsOwed, setAmountsOwed ] = useState<Balances>({})

  useEffect(() => {
    getContacts()
  }, [])

  useEffect(() => {
    getAmountsOwed()
  }, [contacts])

  const getAmountsOwed = () => {
      var amtsOwed: Balances = {}
      expenseGroups.forEach(group => {
        
        group.expenses.forEach(exp => {
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
    
            amtsOwed[uep.userID] += Math.round((exp.amount * uep.percentage) * 100) / 100
          })
        })
    
        setAmountsOwed(amtsOwed)
    
        var balancesArray: any = []
    
        Object.entries(amtsOwed).map((kv) => {
          balancesArray.push(kv)
        })
    
        
        const paymentsDict: PaymentDictionary = {}
    
        while (balancesArray.length > 1) { 
    
          balancesArray.sort(compareBalances)
    
    
          var min: number = balancesArray[0][1]
          var minID: string = balancesArray[0][0]
          var minName: string = getNameForId(balancesArray[0][0], contacts)
    
          var max: number = balancesArray[balancesArray.length - 1][1]
          var maxID: string = balancesArray[balancesArray.length - 1][0]
          var maxName:string = getNameForId(balancesArray[balancesArray.length - 1][0], contacts)
    
          if (!paymentsDict[maxID]) {
            paymentsDict[maxID] = []
          }
    
          if (min + max > 0) {
            balancesArray[balancesArray.length - 1][1] = max + min
            balancesArray.shift()
    
            const payment: Payment = {
              owedToName: minName,
              amount: min,
              owedToId: minID
            }
            paymentsDict[maxID].push(payment)
    
          } else if (min + max < 0) {
            balancesArray[0][1] = max + min
            balancesArray.pop()
    
            const payment: Payment = {
              owedToName: minName,
              amount: max,
              owedToId: minID
            }
            paymentsDict[maxID].push(payment)
            
          } else {
            balancesArray.shift()
            balancesArray.pop()
          }
    
        }
        
        setPayments(paymentsDict)
        console.log(payments)
      })
    }
  
  return (
    <div className='contactsWrapper'>
      <div className='pageHeaderWrapper'>
        <Typography variant='h3'>
          Contacts
        </Typography>
        <Divider sx={{ background: '#1D273B', padding: '3px', borderBottomWidth: '0', width:'100%'}} />
      </div>

      {contacts && contacts.map(c => {
        if (c.ID !== userID) {
          return (<div>
            <UserCard user={c} addButton={false} payments={payments["" + c.ID]} />
          </div>)
        }
      })}
    </div>
  )
}

export default ViewContacts
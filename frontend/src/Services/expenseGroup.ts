import { NavigateFunction } from 'react-router-dom'
import { CreateExpenseGroupForm, ExpenseGroup } from '../Types'
import { get } from 'lodash'
import { GET_EXPENSE_GROUPS_URL, GET_EXPENSES_URL } from '../config'


export const createExpenseGroup = async (createExpenseGroupForm: CreateExpenseGroupForm, navigate: NavigateFunction) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(createExpenseGroupForm)
    }
    try {
        fetch(GET_EXPENSE_GROUPS_URL, options).then(res => { 
            console.log(res)
            if (res.status !== 201) {
                throw new Error(res.statusText)
            }
            return res.json() 

        }).then(json => {
            console.log(json)
            const expenseGroupId = get(json, 'id')
            navigate(`/group/${expenseGroupId}/view`)
        })

    } catch (e) {
        console.error(e)
    }
    
}


export const deleteExpenseGroup = async (expenseGroup: ExpenseGroup, navigate: NavigateFunction) => {
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
        })
      }
    
      fetch(GET_EXPENSE_GROUPS_URL + `/${expenseGroup.ID}`, options).then(res => {
        if (res.status !== 204) {
          console.error("error: ", res.statusText)
      }
        return res
      })
      
    } catch(e) {
      console.error(e)
    }

    navigate('/')
  }


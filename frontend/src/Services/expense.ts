import { useReducer} from 'react'
import { get } from 'lodash'
import { GET_EXPENSES_URL, GET_PERCENTAGES_URL } from '../config'
import { ExpenseForm, User, MemberPercentage } from '../Types'
import { defaultExpenseGroup, expenseGroupState } from '../Reducers/expenseGroupState'

export const createExpense = (expense: ExpenseForm, expenseGroupID: number, members: User[]) => {
    
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(expense)
    }

    try {
        fetch(`${GET_EXPENSES_URL}/${expenseGroupID}`, options).then(res => { 
            if (res.status !== 201 && res.status !== 200) {
                throw new Error(res.statusText)
            }
            return res.json() 

        }).then(json => {
            var percent = 1

            members.forEach((member) => {
                if(get(member, 'id') !== expense.paidByUserId) {
                    const newUEP: MemberPercentage = {
                        percentage: percent,
                        expenseID: get(json, 'id'),
                        userID: "" + get(member, 'id'),
                        firstName: member.firstName
                    }
                    percent = 0
                    const UEPOptions = {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(newUEP)
                    }
                    
                    fetch(GET_PERCENTAGES_URL, UEPOptions).then(res => {
                        if(res.status != 201 && res.status !== 200) {
                            throw new Error(res.statusText)
                        }
    
                    })
                }
            })
        })

    } catch (e) {
        console.log(e)
    }
    

}

export const deleteExpense = async (expenseID: number) => {
    const options = {
        method: 'DELETE',
        headers: { 
            'Content-type': 'application/json',
        },
    }
    try {
        fetch(`${GET_EXPENSES_URL}/${expenseID}`, options).then(res => {
            if (res.status != 204) {
                throw new Error(res.statusText)
            }
        })
        
    } catch (error) {
        console.log(error)
    }
}
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
            console.log(res)
            if (res.status !== 201 && res.status !== 200) {
                throw new Error(res.statusText)
            }
            return res.json() 

        }).then(json => {
            var percent = 1

            members.forEach((member) => {
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
            })
        })

    } catch (e) {
        console.error(e)
    }
    

}

export const deleteExpense = async () => {
    console.log("deleting expense!")
}
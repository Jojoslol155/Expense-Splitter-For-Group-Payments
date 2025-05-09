import { NavigateFunction } from 'react-router-dom'
import { get } from 'lodash'
import { GET_EXPENSES_URL, GET_PERCENTAGES_URL } from '../config'
import { ExpenseForm, MemberPercentage } from '../Types'

export const createExpense = async (expense: ExpenseForm, expenseGroupID: number, userID: string, firstName: string) => {

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
            if (res.status !== 201) {
                throw new Error(res.statusText)
            }
            return res.json() 

        }).then(json => {
            const newUEP: MemberPercentage = {
                percentage: 1,
                expenseID: get(json, 'id'),
                userID,
                firstName
            }

            const UEPOptions = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newUEP)
            }
            fetch(GET_PERCENTAGES_URL, UEPOptions).then(res => {
                if(res.status != 201) {
                    throw new Error(res.statusText)
                }
            })
        })

    } catch (e) {
        console.error(e)
    }
}

export const deleteExpense = async () => {
    console.log("deleting expense!")
}
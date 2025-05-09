import { NavigateFunction } from 'react-router-dom'
import { get } from 'lodash'
import { GET_EXPENSES_URL } from '../config'

export const createExpense = async (expenseName: string, expenseGroupID: number, navigate: NavigateFunction) => {
    console.log("deleting expense!")
}

export const deleteExpense = async () => {
    console.log("deleting expense!")
}
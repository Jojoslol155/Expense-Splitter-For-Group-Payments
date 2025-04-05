import { ExpenseGroup } from './expenseGroupTypes'
import { Expense } from './expenseTypes'

export type ExpenseFormAction = {type: 'SET_EXPENSE_GROUP_NAME', paylod: string} | {type: 'SET_EXPENSE_GROUP', payload: ExpenseGroup}
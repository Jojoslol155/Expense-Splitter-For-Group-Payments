import { ExpenseGroup } from './expenseGroupTypes'
import { Expense, MemberPercentage } from './expenseTypes'

export type ExpenseGroupFormAction = 
{type: 'SET_EXPENSE_GROUP_NAME', paylod: string} |
{type: 'SET_EXPENSE_GROUP', payload: ExpenseGroup} |
{type: 'SET_EXPENSE', payload: Expense} |
{type: 'SET_MEMBER_PERCENTAGE', payload: MemberPercentage}


import { Expense } from "./expenseTypes"
import { User } from './user'

export interface ExpenseGroup {
    ID: number
    name: string
    expenses: Expense[]
    members: User[]
}

export type ExpenseGroupsContextType = {
    expenseGroups: Array<ExpenseGroup>
    setExpenseGroups: (expenseGroups: Array<ExpenseGroup>) => void
}

export interface CreateExpenseGroupForm {
    name: string
}
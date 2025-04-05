import { Expense } from "./expenseTypes"

export interface ExpenseGroup {
    ID: number
    name: string
    expenses: Expense[]
}

export type ExpenseGroupsContextType = {
    expenseGroups: Array<ExpenseGroup>
    setExpenseGroups: (expenseGroups: Array<ExpenseGroup>) => void
}

export interface CreateExpenseGroupForm extends Omit<ExpenseGroup, 'ID'> {}
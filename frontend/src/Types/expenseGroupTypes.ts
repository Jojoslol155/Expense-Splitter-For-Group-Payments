import { Expense } from "./expenseTypes"

export interface ExpenseGroup {
    ID: number
    name: string
    expenses: Expense[]
}
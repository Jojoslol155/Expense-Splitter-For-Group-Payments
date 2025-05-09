import { User, ExpenseGroup, Expense } from '../Types'

export const convertJSONToExpenseGroup = (json: any): ExpenseGroup => {
    const { id, name, expenses, members } = json
    const group: ExpenseGroup = {
        ID: id,
        name,
        expenses,
        members
    }
    return group
}

export const convertJSONToExpense = (json: any): Expense => {
    const { name, id, expenseGroupID, amount, userExpensePercentages, paidByUserId } = json
    const expense: Expense = {
        ID: id,
        name,
        amount,
        expenseGroupID,
        userExpensePercentages,
        paidByUserId
    }
    return expense
}

export const convertJSONToUser = (json: any): User => {
    const { id, lastName, firstName, email } = json;
    const user: User = {
        ID: id,
        lastName,
        firstName,
        email
    }
    return user
}
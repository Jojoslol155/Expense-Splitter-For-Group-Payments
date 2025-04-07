import { User, ExpenseGroup } from '../Types'

export const convertJSONToExpenseGroup = (json: any): ExpenseGroup => {
    const { id, name, expenses } = json;
    const group: ExpenseGroup = {
        ID: id,
        name,
        expenses,
    }
    return group
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
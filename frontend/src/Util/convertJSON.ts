import { ExpenseGroup } from '../Types'

export const convertJSONToExpenseGroup = (json: any): ExpenseGroup => {
    const { id, name, expenses } = json;
    const group: ExpenseGroup = {
        ID: id,
        name,
        expenses,
    }
    return group
}
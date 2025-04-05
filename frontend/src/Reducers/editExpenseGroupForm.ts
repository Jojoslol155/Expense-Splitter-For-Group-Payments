import { ExpenseGroup, ExpenseFormAction } from '../Types'
import { defaultCreateExpenseGroupForm } from './createExpenseGroupForm'

export const editExpenseGroupForm = (state: ExpenseGroup, action: ExpenseFormAction) => {
 switch (action.type) {
    case 'SET_EXPENSE_GROUP_NAME':
        return {...state, name: action.paylod}
 }
}

export const defaultExpenseGroup: ExpenseGroup = {
    ...defaultCreateExpenseGroupForm, ID: 0
}
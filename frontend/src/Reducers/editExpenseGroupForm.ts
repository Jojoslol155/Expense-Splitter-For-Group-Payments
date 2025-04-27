import { ExpenseGroup, ExpenseGroupFormAction, MemberPercentage } from '../Types'
import { defaultCreateExpenseGroupForm } from './createExpenseGroupForm'
import { get } from 'lodash'

export const editExpenseGroupForm = (state: ExpenseGroup, action: ExpenseGroupFormAction) => {
 switch (action.type) {
    case 'SET_EXPENSE_GROUP_NAME':
        return {...state, name: action.paylod}
    case 'SET_EXPENSE_GROUP':
        return {...action.payload}
    case 'SET_EXPENSE':
        return {...state, expenses: [...state.expenses, action.payload]}
    case 'SET_MEMBER_PERCENTAGE':
        for (let i = 0; i < state.expenses.length; i++) {
            let e = state.expenses[i]

            if (get(e, 'id') == action.payload.expenseID) {
                let newExpenses = [...state.expenses]
                let newUEP = [...e.userExpensePercentages]

                for (let j = 0; j < e.userExpensePercentages.length; j++) {
                    let uep = e.userExpensePercentages[j]
                    if (uep.userID == action.payload.userID) {
                        newUEP[j] = action.payload
                    }
                }
                newExpenses[i] = {...e, 
                    userExpensePercentages: newUEP}


                return {...state, expenses: newExpenses}
            }
        }

        return {...state}
    default:
        return {...state}
    }
}

export const defaultExpenseGroup: ExpenseGroup = {
    ...defaultCreateExpenseGroupForm, ID: 0, members: [], expenses: []
}
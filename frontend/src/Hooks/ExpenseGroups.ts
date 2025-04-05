import { useReducer, useContext } from 'react'
import { ExpenseGroupsContextType, ExpenseGroup } from '../Types'
import { useNavigate } from 'react-router-dom'
import { ExpenseGroupsContext } from '../Context/ExpenseGroups';
import { defaultExpenseGroup, editExpenseGroupForm } from '../Reducers/editExpenseGroupForm';

export function useGetAllExpenseGroups() {
    const { expenseGroups, setExpenseGroups } = useContext(ExpenseGroupsContext) as ExpenseGroupsContextType

    const testExpenseGroupOne : ExpenseGroup = {
        name: "Birthday Birthday",
        ID: 5,
        expenses: [{
            ID: 11, amount: 12.99, name: 'pizza', expenseGroupID: 5
        }]
    }

    const testExpenseGroupTwo : ExpenseGroup = {
        name: "Beach trip",
        ID: 7,
        expenses: [{
            ID: 12, amount: 12.99, name: 'soda', expenseGroupID: 7
        }]
    }

    const getExpenseGroups = () => {

        const newGroups = [testExpenseGroupOne, testExpenseGroupTwo];
        setExpenseGroups(newGroups)
    }

    return [expenseGroups, getExpenseGroups] as const
}

export function useGetExpenseGroup(expenseGroupID: number) {
    const [ expenseGroup, dispatch ]= useReducer(editExpenseGroupForm, defaultExpenseGroup)

    const defaultExpenseGroups = (): ExpenseGroup[] => {
        const testExpenseGroupOne : ExpenseGroup = {
            name: "Birthday Birthday",
            ID: 5,
            expenses: [{
                ID: 11, amount: 12.99, name: 'pizza', expenseGroupID: 5
            }]
        }
    
        const testExpenseGroupTwo : ExpenseGroup = {
            name: "Beach trip",
            ID: 7,
            expenses: [{
                ID: 12, amount: 12.99, name: 'soda', expenseGroupID: 7
            }]
        }

        return [testExpenseGroupOne, testExpenseGroupTwo];

    }

    const getExpenseGroup = (): ExpenseGroup | null => {
        defaultExpenseGroups().forEach((g: ExpenseGroup) => {
            if (g.ID == expenseGroupID) {
                return g;
            }
        }) 
        return null
    }

    return [expenseGroup, getExpenseGroup, dispatch] as const
}
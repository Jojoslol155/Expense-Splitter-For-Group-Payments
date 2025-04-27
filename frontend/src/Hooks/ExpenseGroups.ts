import { useReducer, useContext } from 'react'
import { ExpenseGroupsContextType, ExpenseGroup, Expense, MemberPercentage } from '../Types'
import { GET_EXPENSE_GROUPS_URL, GET_USERS_URL, GET_PERCENTAGES_URL } from '../config'
import { ExpenseGroupsContext } from '../Context/ExpenseGroups'
import { ContactsContext } from '../Context/User'
import { convertJSONToExpenseGroup } from '../Util/convertJSON'
import { defaultExpenseGroup, editExpenseGroupForm } from '../Reducers/editExpenseGroupForm'
//import { memberPercentagesForm, defaultMemberPercentages } from '../Reducers/editExpense'

export function useGetAllExpenseGroups() {
    const { expenseGroups, setExpenseGroups } = useContext(ExpenseGroupsContext) as ExpenseGroupsContextType

    const options = {
        method: 'GET'
    }

    const getExpenseGroups = async () => {
        try {
            fetch(GET_EXPENSE_GROUPS_URL, options).then(res => {
                if (res.status !== 200) {
                    console.error("error")
                }

                return res.json();
            }).then((groupsRes) => {
                const groups = new Array<ExpenseGroup>;

                groupsRes.forEach((eg: any) => {
                    groups.push(convertJSONToExpenseGroup(eg))
                    setExpenseGroups(groups);
                })
            }).catch(err => {
                return err
            })
        } catch(err) {
            // TODO handle error
            console.error(err)
        }
        
    }

    return [expenseGroups, getExpenseGroups] as const
}

export function useGetExpenseGroup(expenseGroupID: number) {
    const [ expenseGroup, dispatch ] = useReducer(editExpenseGroupForm, defaultExpenseGroup)

    // TODO: authentication
    // TODO: refactor state management... :( 
    const options = {
        method: 'GET'
    }
    const getExpenseGroup = async () => {
        try {
            fetch(GET_EXPENSE_GROUPS_URL + `/${expenseGroupID}`, options).then((res) => {
                if (res.status !== 200) {
                    console.error("error")
                }

                return res.json();
            }).then((json) => {
                const group = convertJSONToExpenseGroup(json)

                dispatch({type: 'SET_EXPENSE_GROUP', payload: group})
            })
        } catch(err) {
            // TODO handle error
            console.error(err)
        }
    }

    return [expenseGroup, getExpenseGroup, dispatch] as const
}

export function usePutExpense(expense: Expense) {

    const putExpense = async () => {
        
    }

    return [expense, putExpense] as const
}



// public int ExpenseID { get; set; }
// public int UserID { get; set; }
// public double Percentage { get; set; }
// public string FirstName { get; set; } = string.Empty;
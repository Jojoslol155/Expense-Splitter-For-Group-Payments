import { useReducer, useContext } from 'react'
import { ExpenseGroupsContextType, ExpenseGroup } from '../Types'
import { GET_EXPENSE_GROUPS_URL } from '../config'
import { ExpenseGroupsContext } from '../Context/ExpenseGroups';
import { convertJSONToExpenseGroup } from '../Util/convertJSON'
import { defaultExpenseGroup, editExpenseGroupForm } from '../Reducers/editExpenseGroupForm';

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
                    groups.push(convertJSONToExpenseGroup(eg));
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
    const [ expenseGroup, dispatch ]= useReducer(editExpenseGroupForm, defaultExpenseGroup)

    // TODO: authentication
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
                const group = convertJSONToExpenseGroup(json);
                dispatch({type: 'SET_EXPENSE_GROUP', payload: group})
            })
        } catch(err) {
            // TODO handle error
            console.error(err)
        }
    }


    return [expenseGroup, getExpenseGroup, dispatch] as const
}
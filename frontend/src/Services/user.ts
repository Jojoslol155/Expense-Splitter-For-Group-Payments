import { useContext, useReducer } from 'react'
import { defaultExpenseGroup, expenseGroupState } from '../Reducers/expenseGroupState'
import { method } from 'lodash'
import { GET_EXPENSE_GROUPS_URL, GET_EXPENSES_URL, GET_GROUP_MEMBERS_URL, GET_PERCENTAGES_URL } from '../config'
import { GroupMember, MemberPercentage, StatusContextType, StatusType } from '../Types'
import { useGetExpenseGroup } from '../Hooks/ExpenseGroups'
import { StatusContext } from '../Context/Status'

export const addGroupMember = async (groupMember: GroupMember, firstName: string) => {
    // const { setStatus, setErrorMessage } = useContext(StatusContext) as StatusContextType

    const postGroupMemberOptions = {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
        body: JSON.stringify(groupMember)
      }

      const getOptions = {
        method: 'GET'
      }

    try{
        fetch(GET_GROUP_MEMBERS_URL, postGroupMemberOptions).then(res => {
            if (res.status !== 200) {
                throw new Error(res.statusText)
            }
        }).then(() => {
            fetch(GET_EXPENSE_GROUPS_URL + `/${groupMember.expenseGroupID}`, getOptions).then(res => {
                if (res.status !== 200) {
                    throw new Error(res.statusText)
                }
                return res.json()
            }).then(json => {
                json.expenses.forEach((e: any) => {
                    try {
                        const newUEP: MemberPercentage = {
                            expenseID: e.id,
                            userID: groupMember.memberID,
                            percentage: 0,
                            firstName,
                        }

                        const postPercentageOptions = {
                            method: 'POST',
                            headers: { 
                                'Content-type': 'application/json',
                              },
                            body: JSON.stringify(newUEP)
                        }
                        fetch(GET_PERCENTAGES_URL, postPercentageOptions).then(r => {
                            if (r.status !== 200) {
                                throw new Error(r.statusText)
                            }
                            return r.json()
                        })
                    } catch (err) {
                        // setStatus(StatusType.ERROR)
                        // setErrorMessage(err as string)
                        console.error(err)
                    } 
                })
            })
        })
    } catch(e) {
        console.error(e)
    }
}

export const deleteGroupMember = () => {
    console.log("deleting!")
}
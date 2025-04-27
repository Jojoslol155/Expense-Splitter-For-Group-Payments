import { useReducer, useContext } from 'react'

import { MemberPercentagesContextType } from '../Types'
import { MemberPercentagesContext } from '../Context/MemberPercentages'

export function useGetPercentagesForExpense() {
    const { memberPercentages, setMemberPercentages } = useContext(MemberPercentagesContext) as MemberPercentagesContextType

    const options = {
        method: 'GET'
    }

    const getPercentagesForExpense = async () => {

    }
}
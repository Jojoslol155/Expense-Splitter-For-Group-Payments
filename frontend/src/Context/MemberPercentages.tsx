import React, { createContext, useState } from "react"
import { ExpenseGroup, Expense, MemberPercentagesContextType, MemberPercentage } from "../Types"

export const MemberPercentagesContext = createContext<MemberPercentagesContextType | null>(null)

const MemberPercentagesContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
    const [memberPercentages, setMemberPercentages] = useState<Array<MemberPercentage>>([])

    return <MemberPercentagesContext.Provider value={{
        memberPercentages,
        setMemberPercentages
    }}>
        {children}
    </MemberPercentagesContext.Provider>
}

export default MemberPercentagesContextProvider
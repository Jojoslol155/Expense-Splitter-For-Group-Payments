import React, { createContext, useState } from "react"
import { ExpenseGroup, ExpenseGroupsContextType } from "../Types"

export const ExpenseGroupsContext = createContext<ExpenseGroupsContextType | null>(null)

const ExpenseGroupsContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
    const [expenseGroups, setExpenseGroups] = useState<Array<ExpenseGroup>>([])

    return <ExpenseGroupsContext.Provider value={{
        expenseGroups,
        setExpenseGroups
    }}>
        {children}
    </ExpenseGroupsContext.Provider>
}

export default ExpenseGroupsContextProvider
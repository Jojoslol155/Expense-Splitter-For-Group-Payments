export interface Expense {
    name: string
    ID: number
    amount: number
    expenseGroupID: number
    userExpensePercentages: MemberPercentage[]
}

export type ExpenseForm = Omit<Expense, "ID" | "userExpensePercentages">

export interface MemberPercentage {
    expenseID: number
    percentage: number
    firstName: string
    userID: string
}

export interface GroupMember {
    expenseGroupID: number
    memberID: string
}
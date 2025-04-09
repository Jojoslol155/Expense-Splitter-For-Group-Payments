export interface Expense {
    name: string
    ID: number
    amount: number
    expenseGroupID: number
}

export interface MemberPercentage {
    expenseID: number
    percentage: number
    userName: string
    userID: number
}
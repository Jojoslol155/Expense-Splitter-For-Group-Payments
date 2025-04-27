export interface Expense {
    name: string
    ID: number
    amount: number
    expenseGroupID: number
    userExpensePercentages: MemberPercentage[]
}

export interface MemberPercentage {
    expenseID: number
    percentage: number
    firstName: string
    userID: number
}

export interface GroupMember {
    expenseGroupID: number
    memberID: number
}
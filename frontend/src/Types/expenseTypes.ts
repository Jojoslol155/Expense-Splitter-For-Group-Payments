export interface Expense {
    name: string
    ID: number
    amount: number
    expenseGroupID: number
    userExpensePercentages: MemberPercentage[]
    paidByUserId: string
}

export type ExpenseForm = Omit<Expense, "ID" | "userExpensePercentages">

export interface EditExpenseForm {
    name: string
    amount: number
}

export interface Balances {[UserID: string] : number}

export interface MemberPercentage {
    expenseID: number
    percentage: number
    firstName: string
    userID: string
}

export interface Payment {
    owedToName: string
    owedToId: string
    amount: number
}

export interface PaymentDictionary {
    [OwedFromID: string] : Payment[]
}

export interface GroupMember {
    expenseGroupID: number
    memberID: string
}
import { CreateExpenseGroupForm, ExpenseForm } from "../Types"
import React, { useEffect } from 'react'
import { ExpenseGroup } from '../Types'

export const createExpenseGroupForm = (name: string): CreateExpenseGroupForm => {
    return {
        ...defaultCreateExpenseGroupForm,
        name: name,
    };
};


export const defaultCreateExpenseGroupForm : CreateExpenseGroupForm = {
    name: '',
}

export const defaultExpenseForm: ExpenseForm = {
    name: '',
    amount: 0,
    expenseGroupID: 0,
    paidByUserId: ''
}
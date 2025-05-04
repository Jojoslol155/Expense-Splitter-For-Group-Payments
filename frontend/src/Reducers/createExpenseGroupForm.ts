import { CreateExpenseGroupForm } from "../Types"
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
    expenses: [],
    members: []
}
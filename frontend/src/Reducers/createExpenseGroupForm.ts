import { CreateExpenseGroupForm } from "../Types"
import React, { useEffect } from 'react'


export const defaultCreateExpenseGroupForm : CreateExpenseGroupForm = {
    name: '',
    expenses: [],
    members: []
}
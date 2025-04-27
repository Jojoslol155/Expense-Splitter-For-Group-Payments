import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Nav from '../../Components/Nav/Nav'
import ViewExpenseGroup from '../ExpenseGroup/ViewExpenseGroup'
import ViewContacts from '../Contacts/ViewContacts'
import ExpenseGroupsContextProvider from '../../Context/ExpenseGroups'
import AuthContextProvider from '../../Context/Auth'
import ContactsContextProvider from '../../Context/Contacts'
import { Container } from '@mui/material'

function App() {
  return (
    <AuthContextProvider>
      <ContactsContextProvider>
        <ExpenseGroupsContextProvider>
          <div className="appWrapper">
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Dashboard />}/>
                    <Route path="/group" element={<ViewExpenseGroup />}/> 
                    <Route path="/contacts" element={<ViewContacts />}/> 
                    <Route path="/group/:id/view" element={<ViewExpenseGroup />}/>
                </Routes>
            </BrowserRouter>
          </div>
        </ExpenseGroupsContextProvider>
      </ContactsContextProvider>
    </AuthContextProvider>
  )
}

export default App

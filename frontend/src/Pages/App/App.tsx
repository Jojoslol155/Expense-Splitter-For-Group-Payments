import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import ViewExpenseGroup from '../ExpenseGroup/ViewExpenseGroup'
import Nav from '../../Components/Navigation/Nav'
import ViewContacts from '../Contacts/ViewContacts'
import ExpenseGroupsContextProvider from '../../Context/ExpenseGroups'
import AuthContextProvider from '../../Context/Auth'
import StatusContextProvider from '../../Context/Status'
import ContactsContextProvider from '../../Context/Contacts'
import Login from '../Login/Login'
import PrivateRoute from '../../Components/PrivateRoute/PrivateRoute'
import Register from '../Register/Register'

function App() {
  return (
    <AuthContextProvider>
      <StatusContextProvider>
        <ContactsContextProvider>
          <ExpenseGroupsContextProvider>
            <div className="appWrapper">
              <BrowserRouter>
                  <Nav />
                  <Routes>
                      <Route path="/" element={<PrivateRoute outlet={<Dashboard />}  />} />
                      <Route path="/group" element={<PrivateRoute outlet={<ViewExpenseGroup />} />} /> 
                      <Route path="/contacts" element={<PrivateRoute outlet={<ViewContacts />} />} /> 
                      <Route path="/group/:id/view" element={<PrivateRoute outlet={<ViewExpenseGroup />} />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                  </Routes>
              </BrowserRouter>
            </div>
          </ExpenseGroupsContextProvider>
        </ContactsContextProvider>
      </StatusContextProvider>
    </AuthContextProvider>
  )
}

export default App

import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Nav from '../../Components/nav/Nav'
import ViewExpenseGroup from '../ExpenseGroup/ViewExpenseGroup'
import ViewContacts from '../Contacts/ViewContacts'
import ExpenseGroupsContextProvider from '../../Context/ExpenseGroups'

function App() {
  return (
    <ExpenseGroupsContextProvider>
      <div className="App">
        <BrowserRouter>
          <div className='app-wrapper'>
            <Nav />
            <Routes>
              <Route path="/" element={<Dashboard />}/>
              <Route path="/group" element={<ViewExpenseGroup />}/> 
              <Route path="/contacts" element={<ViewContacts />}/> 
              <Route path="/group/:id/view" element={<ViewExpenseGroup />}/>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ExpenseGroupsContextProvider>
  )
}

export default App

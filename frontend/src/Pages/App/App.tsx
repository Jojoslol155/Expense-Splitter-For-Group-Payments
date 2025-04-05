import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Nav from '../../Components/nav/Nav'
import ViewExpenseGroup from '../ExpenseGroup/ViewExpenseGroup'
import ViewContacts from '../Contacts/ViewContacts'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='app-wrapper'>
          <Nav />
          <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/group" element={<ViewExpenseGroup />}/> 
            <Route path="/contacts" element={<ViewContacts />}/> 

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

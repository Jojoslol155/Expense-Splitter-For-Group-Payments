import React, { useEffect } from 'react'
import './Dashboard.css'
import { useGetAllExpenseGroups } from '../../Hooks/ExpenseGroups';
import ExpenseGroups from '../../Components/ExpenseGroups/ExpenseGroups';

function Dashboard() {
  const [expenseGroups, getExpenseGroups] = useGetAllExpenseGroups();

  useEffect(() => {
    getExpenseGroups()
  }, [])


  return (
    <div className='dashboardWrapper'>
        <ExpenseGroups groups={expenseGroups}/>
    </div>
  );
}

export default Dashboard;

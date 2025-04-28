import React, { useEffect } from 'react'
import './Dashboard.css'
import { useGetAllExpenseGroups } from '../../Hooks/ExpenseGroups';
import ExpenseGroups from '../../Components/ExpenseGroups/ExpenseGroups';
import AddNew from '../../Components/AddNew/AddNew';

function Dashboard() {
  const [expenseGroups, getExpenseGroups] = useGetAllExpenseGroups();

  useEffect(() => {
    getExpenseGroups()
  }, [])


  return (
    <div className='dashboardWrapper'>
          <AddNew/>

         <ExpenseGroups groups={expenseGroups} />
          
    </div>
  );
}

export default Dashboard;

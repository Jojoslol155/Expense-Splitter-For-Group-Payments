import React, { Dispatch, useState } from 'react'
import { Slider } from '@mui/material'
import { MemberPercentage, ExpenseGroupFormAction } from '../../Types'
import { formatPercent, formatDollarAmount } from '../../Util/formatting'
import './MemberPercentage.css'

type Props = {
    memberPercentage: MemberPercentage
    amount: number
    dispatch: Dispatch<ExpenseGroupFormAction>
}

const getAmountOwedForUser = (percentage: number, totalAmount: number): string => {
    return formatDollarAmount(percentage * totalAmount)
  }
  

const UserExpensePercentage = ({memberPercentage, amount, dispatch}: Props) => {

  const handleSlider = (event:any, v: number) => {
    
    dispatch({type: 'SET_MEMBER_PERCENTAGE', payload: {
      expenseID: memberPercentage.expenseID,
      userID: memberPercentage.userID,
      firstName: memberPercentage.firstName,
      percentage: v
    }})
  }

  return (
    <div className='percentageMapWrapper'>
    <div className='percentageMapElement percentageName'>{memberPercentage.firstName}</div>
    <Slider 
      value={memberPercentage.percentage} 
      min={0} 
      max={1} 
      step={.1} 
      onChange={handleSlider} 
      defaultValue={memberPercentage.percentage}/>
    <div className='percentageMapElement numbers marginLeft'>{formatPercent(memberPercentage.percentage)}</div>
    <div className='percentageMapElement numbers'>{getAmountOwedForUser(memberPercentage.percentage, amount)}</div>
  </div>
  )
}



export default UserExpensePercentage
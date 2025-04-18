import React, { Dispatch, useState } from 'react'
import { Slider } from '@mui/material'
import { MemberPercentage } from '../../Types'
import { formatPercent, formatDollarAmount } from '../../Util/formatting'
import './MemberPercentage.css'

type Props = {
    memberPercentage: MemberPercentage
    amount: number
}

const getAmountOwedForUser = (percentage: number, totalAmount: number): string => {
    return formatDollarAmount(percentage * totalAmount)
  }
  

const UserExpensePercentage = ({memberPercentage, amount}: Props) => {
  const [percentage, setPercentage] = useState(memberPercentage.percentage)

  // TODO: add dispatch
  const handleSlider = (event:any, v: number) => {
    setPercentage(v);
  }

  return (
    <div className='percentageMapWrapper'>
    <div className='percentageMapElement name'>{memberPercentage.firstName}</div>
    <Slider value={percentage} min={0} max={1} step={.1} onChange={handleSlider} />
    <div className='percentageMapElement numbers marginLeft'>{formatPercent(percentage)}</div>
    <div className='percentageMapElement numbers'>{getAmountOwedForUser(percentage, amount)}</div>
  </div>
  )
}



export default UserExpensePercentage
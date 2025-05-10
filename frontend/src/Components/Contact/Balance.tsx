import React from 'react'
import { Payment } from '../../Types'
import { formatDollarAmount } from '../../Util/formatting'
import './Balance.css'
import { PaymentsOutlined } from '@mui/icons-material'

type Props = {
  payment: Payment
}

const Balance = ({payment: {owedToName, amount} }: Props) => {
  return (
    <div className="balanceWrapper">
      <div className='owes'>
        <PaymentsOutlined/>
        {'Owes'} {formatDollarAmount(amount)} {"to: "} {owedToName}
      </div>
      {/* <div>
        {"Mark paid"}
      </div> */}
    </div>
  )
}

export default Balance
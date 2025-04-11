import { Accordion, AccordionDetails, AccordionSummary, ListItem, ListItemText } from '@mui/material'
import {formatDollarAmount, formatPercent} from '../../Util/formatting'
import ExpandIcon from '../ExpandIcon/ExpandIcon'
import './Expense.css'
import { MemberPercentage } from '../../Types'

type Props = {
    name: string
    amount: number
    memberPercentages: MemberPercentage[]
}

const getAmountOwedForUser = (percentage: number, totalAmount: number): string => {
  return formatDollarAmount(percentage * totalAmount)
}

const Expense = ({name, amount, memberPercentages}: Props) => {
  return (
    <ListItem>
      <Accordion sx={{minWidth:'320px'}}>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <div className='expenseHeader'>
            <div className='expenseHeaderElement'>{name}</div>
            <div className='expenseHeaderElement'>{formatDollarAmount(amount)} </div>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{minWidth:'320px'}}>
            {memberPercentages.map(p => {
              return (
                <div className='percentageMapWrapper'>
                  <div className='percentageMapElement'>{p.firstName}</div>
                  <div className='percentageMapElement'>{formatPercent(p.percentage)}</div>
                  <div className='percentageMapElement'>{getAmountOwedForUser(p.percentage, amount)}</div>
                </div>
              )})
            }
        </AccordionDetails>
      </Accordion>
    </ListItem>
  )
}

export default Expense
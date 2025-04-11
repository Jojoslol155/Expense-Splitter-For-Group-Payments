import { Accordion, AccordionDetails, AccordionSummary, ListItem, ListItemText } from '@mui/material'
import {formatDollarAmount, formatPercent} from '../../Util/formatting'
import ExpandIcon from '../ExpandIcon/ExpandIcon'
import './Expense.css'
import { MemberPercentage } from '../../Types'

type Props = {
    name: string
    amount: number
}

const TestPercentageMap = (): MemberPercentage[] => {
  const percentages: MemberPercentage[] = [{
    expenseID: 1,
    userID: 1,
    percentage: .33,
    userName: "Cassandra"
  }, {
    expenseID: 1,
    userID: 1,
    percentage: .33,
    userName: "Princess"
  }, {
    expenseID: 1,
    userID: 1,
    percentage: .34,
    userName: "Professor"
  }]

  return percentages
}

const getAmountOwedForUser = (percentage: number, totalAmount: number): string => {
  return formatDollarAmount(percentage * totalAmount)
}

const Expense = ({name, amount}: Props) => {
  return (
    <ListItem>
      <Accordion sx={{minWidth:'320px'}}>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <div className='expenseHeader'>
            <div>{name}</div>
            <div>{formatDollarAmount(amount)} </div>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{minWidth:'320px'}}>
            {TestPercentageMap().map(p => {
              return (
                <div className='percentageMapWrapper'>
                  <div className='percentageMapElement'>{p.userName}</div>
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
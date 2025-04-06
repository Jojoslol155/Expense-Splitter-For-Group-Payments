import React from 'react'
import { ExpenseGroup } from '../../Types'
import ExpenseGroupCard from './ExpenseGroupCard'

type Props = {
    groups: ExpenseGroup[]
}

const ExpenseGroups = ({groups}: Props) => {
  return (
    <>
        {groups && groups.map((g) => {
            return <div>
                <ExpenseGroupCard name={g.name} groupID={g.ID} />
            </div>
        })}
    </>
    
  )
}

export default ExpenseGroups
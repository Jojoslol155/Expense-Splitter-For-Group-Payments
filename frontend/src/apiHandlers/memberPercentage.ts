import { GET_PERCENTAGES_URL } from '../config'
import { Expense, MemberPercentage } from '../Types'
import { get } from 'lodash'

export const saveMemberPercentages = async (expense: Expense, setShowAlert: (alert: boolean) => void) => {
    let percentageSum = 0;
    for (let i = 0; i < expense.userExpensePercentages.length; i++) {
      percentageSum = Math.round(percentageSum + expense.userExpensePercentages[i].percentage)
    }
  
    if (percentageSum !== 1) {
      setShowAlert(true)
      return
    }
  
    for (let i = 0; i < expense.userExpensePercentages.length; i++) {
      const options = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: toMemberPercentageReq(expense.userExpensePercentages[i]),
      }
  
        try {
            fetch(GET_PERCENTAGES_URL + `/${get(expense, 'id')}`, options).then(res => {
                if (res.status !== 200) {
                    console.error("error")
                }
  
                return res
            })
        } catch(e) {
            console.error(e)
        }
    }
  }

  const toMemberPercentageReq = (mp: MemberPercentage) => {
    const json = JSON.stringify(mp)
    return json
  }
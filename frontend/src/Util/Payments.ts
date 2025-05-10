import { User } from "../Types"
export const compareBalances = (a: [string, number], b: [string, number]) => {
  if (a[1] === b[1]) {
    return 0
  }
  return (a[1] < b[1]) ? -1 : 1
}

export const getNameForId = (id: string, contacts: User[]): string => {
    let name = ""
    contacts.forEach(c => {
      if (c.ID == id) {
        name = c.firstName + " " + c.lastName
      }
    })
    return name
  }
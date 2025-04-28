export interface User {
    ID: number
    firstName: string
    lastName: string
    email: string
}

export type ContactsContextType = {
    contacts: Array<User>
    setContacts: (contacts: Array<User>) => void
}
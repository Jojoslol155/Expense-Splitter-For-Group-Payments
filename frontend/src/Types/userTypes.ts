export interface User {
    ID: string
    firstName: string
    lastName: string
    email: string
}

export type ContactsContextType = {
    contacts: Array<User>
    setContacts: (contacts: Array<User>) => void
}

export type UserContextType = {
    token: string
    setToken: (token: string) => void
    username: string
    setUsername: (username: string) => void
    email: string
    setEmail: (email: string) => void
}

export type LoginForm = {
    username: string
    password: string
}

export type RegisterForm = {
    firstName: string
    lastName: string
    email: string
    password: string
    username: string
}
import React, { createContext, useState } from "react"
import { User, ContactsContextType } from "../Types"

export const ContactsContext = createContext<ContactsContextType | null>(null)

const ContactsContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
    const [contacts, setContacts] = useState<Array<User>>([])

    return <ContactsContext.Provider value={{
        contacts,
        setContacts
    }}>
        {children}
    </ContactsContext.Provider>
}

export default ContactsContextProvider
import React, { createContext, useState } from 'react'
import { StatusType, StatusContextType } from '../Types'

export const StatusContext = createContext<StatusContextType | null>(null)

const StatusContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
    const [status, setStatus] = useState(StatusType.COMPLETE)
    const [errorMessage, setErrorMessage] = useState('')

    return <StatusContext.Provider value={{
        status,
        errorMessage,
        setStatus,
        setErrorMessage
    }}>
        {children}
    </StatusContext.Provider>
}

export default StatusContextProvider
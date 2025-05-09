import React, { createContext, useEffect, useState } from 'react'
import { useLocalStorage } from '../Hooks/LocalStorage'
import { LoginForm, RegisterForm, UserContextType } from '../Types'

export const AuthContext = createContext<UserContextType>({} as UserContextType)

export const AuthContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
    // const navigate = useNavigate()
    const [token, setToken] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [userID, setID] = useState('')
    // const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const username = localStorage.getItem("username")
        const token = localStorage.getItem("token")
        const userID = localStorage.getItem("id")
        const firstName = localStorage.getItem("firstName")
        if (username && token && firstName && userID && username !== '' && token !== '') {
            setUsername(username)
            setToken(token)
            setFirstName(firstName)
            setID(userID)
        }
    }, [])


    return <AuthContext.Provider value={{
        token,
        username,
        email,
        firstName,
        userID,
        setEmail,
        setToken,
        setUsername,
        setFirstName,
        setID
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider
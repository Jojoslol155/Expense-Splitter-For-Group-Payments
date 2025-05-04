import React, { createContext, useEffect, useState } from 'react'
import { useLocalStorage } from '../Hooks/LocalStorage'
import { LoginForm, RegisterForm, UserContextType } from '../Types'

export const AuthContext = createContext<UserContextType>({} as UserContextType)

export const AuthContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
    // const navigate = useNavigate()
    const [token, setToken] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    // const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const username = localStorage.getItem("username")
        const token = localStorage.getItem("token")
        if (username && token && username !== '' && token !== '') {
            setUsername(username)
            setToken(token)
        }
    }, [])


    return <AuthContext.Provider value={{
        token,
        username,
        email,
        setEmail,
        setToken,
        setUsername
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider
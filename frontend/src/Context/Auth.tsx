import React, { createContext } from 'react'
import { useLocalStorage } from '../Hooks/LocalStorage'
import { UserContextType } from '../Types'

export const AuthContext = createContext<UserContextType | null>(null)

const AuthContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "")
    const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "")
    const [email, setEmail] = useLocalStorage("email", "")
    const [username, setUsername] = useLocalStorage("username", "")

    return <AuthContext.Provider value={{
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        email,
        setEmail,
        username,
        setUsername
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider
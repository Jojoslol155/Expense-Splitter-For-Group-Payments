import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { LOGIN_URL, REGISTER_URL } from "../config"
import { AuthContext } from "../Context/Auth"
import { LoginForm, RegisterForm, UserContextType } from '../Types'

export const useLogin = (loginData: LoginForm) => {
    const { setToken, setID, setFirstName, setEmail } = useContext(AuthContext) as UserContextType
    const navigate = useNavigate()

    const options = {
        method: 'POST',
        headers: { 
            'Content-type': 'application/json',
        },
        body: JSON.stringify(loginData)
    }
    const login = async () => {
        try {
            fetch(LOGIN_URL, options).then(res => {
                if (res.status !== 200) {
                    throw new Error(res.statusText)
                }
                return res.json()
            }).then(json => {
                const firstName = json['firstName']
                const token = json['token']
                const id = json['id']
                const email = json['email']
                const username = json['userName']

                setToken(token)
                setID(id)
                setFirstName(firstName)
                setEmail(email)
                localStorage.setItem('token', token)
                localStorage.setItem('username', username)
                localStorage.setItem('firstName', firstName)
                localStorage.setItem('email', email)
                localStorage.setItem('id', id)
                navigate('/')
            })
        } catch (e) {
            // TODO HANDLE ERROR
            console.error(e)
        }
    }
    return [login] as const
}

export const useRegister = (registerData: RegisterForm) => {
    const options = {
        method: 'POST',
        headers: { 
            'Content-type': 'application/json',
        },
        body: JSON.stringify(registerData)
    }

    const register = async () => {
        try{
        return fetch(REGISTER_URL, options).then(res => {
            return res.json()
        }).then(json => {
            return json
        })
        } catch (e) {
            console.error(e)
        }
    }

    return [register] as const
}
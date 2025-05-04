import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { LOGIN_URL, REGISTER_URL } from "../config"
import { AuthContext } from "../Context/Auth"
import { LoginForm, RegisterForm, UserContextType } from '../Types'

export const useLogin = (loginData: LoginForm) => {
    const { token, setToken } = useContext(AuthContext) as UserContextType
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
                console.log(json)
                setToken(json['token'])
                localStorage.setItem('token', json['token'])
                localStorage.setItem('username', json['userName'])
                localStorage.setItem('email', json['email'])
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
import React, { useContext } from 'react'
import { AuthContext } from '../../Context/Auth'
import { Navigate } from 'react-router-dom'
import { UserContextType } from '../../Types'

type ProtectedRouteProps = {
    outlet: React.JSX.Element
}

function PrivateRoute({ outlet }: ProtectedRouteProps) {
    const { token } = useContext(AuthContext) as UserContextType

    if (token === '') { // todo: check if access token is valid?
        return <Navigate to="/login" />
    }

    return outlet

}

export default PrivateRoute
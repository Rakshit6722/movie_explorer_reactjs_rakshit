import React, { ReactNode, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({children}:{children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        checkAndHandleToken()
    },[token])

    const checkAndHandleToken = () => {
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token)
        } else {
            setToken(null)
        }
    }

    return token ? <Navigate to={'/'}/> : <>{children}</>
}

export default AuthRoute

import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('token'));
        }

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        }
    }, [])
    return token ? children : <Navigate to="/login" replace state={{ from: window.location.pathname }} />
}

export default ProtectedRoute

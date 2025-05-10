import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logoutUtil } from '../../utils/authActions';
import { useNavigate } from 'react-router-dom';

function TokenManager() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAndHandleToken()

        const intervalId = setInterval(() => {
            console.log("Checking token validity...")
            checkAndHandleToken()
        }, 1000 * 5 * 60);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                checkAndHandleToken()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
    }, [])

    const checkToken = (): boolean => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                console.log("Decoded Token:", decodedToken)
                if (!decodedToken.exp) return false

                const currentTime = Math.floor(Date.now() / 1000)
                return decodedToken.exp > currentTime
            }
            return false;
        } catch (err) {
            console.error('Error decoding token:', err);
            return false;
        }
    }

    const logout = () => {
        logoutUtil(dispatch, navigate)
        setIsAuthenticated(false);
        toast.info("Your session has expired. Please log in again.", { autoClose: 3000, position: "top-right" });
    }

    const checkAndHandleToken = () => {
        const isValid = checkToken()
        setIsAuthenticated(isValid)

        if (!isValid && localStorage.getItem('token')) {
            logout()
        }

        return isValid
    }

    return {isAuthenticated, checkAndHandleToken}
}

export default TokenManager

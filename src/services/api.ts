import axios, { AxiosResponse } from 'axios'
import { apiConnector } from './apiConnector'
import { toast } from 'react-toastify'

const BASE_URL = 'https://movie-explorer-rorakshaykat2003-movie.onrender.com/api/v1'


export const loginApi = async (data: { email: string, password: string }) => {
    try {

        const payload = {
            email: data.email,
            password: data.password
        }
        const response = await apiConnector('POST', `${BASE_URL}/login`, payload)
        return response
    } catch (err: any) {
        console.log(err)
        console.log(err?.status)

        if (err?.status === 401) {
            toast.error(err?.response?.data?.error ?? 'Something went wrong, try again!')
        }
    }
}

export const registerApi = async (data: { first_name: string, last_name: string, email: string, mobile_number: string, password: string }) => {
    try {
        const response = await apiConnector('POST', `${BASE_URL}/signup`, data, {})
        return response
    } catch (err: any) {
        throw err
        console.log(err)
    }
}


export const userNotificationApi = async (data: { device_token: string, notifications_enabled: boolean }) => {
    const localStorageToken = localStorage.getItem('token')
    console.log("fcm from userNotificationApi", data.device_token)
    if (!localStorageToken) return
    try {
        // const response = await apiConnector('POST', `${BASE_URL}/update_preferences`, data, {
        //     Authorization: `Bearer ${localStorageToken}`
        // })
        const response = await axios.post(
            'https://movie-explorer-rorakshaykat2003-movie.onrender.com/api/v1/update_preferences',
            {
                device_token: data.device_token,
                notifications_enabled: data.notifications_enabled
            },
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorageToken}`
                }
            }
        );
        console.log("response", response)
    } catch (err: any) {
        console.log(err)
        throw err
    }
}

export const addSubscriptioApi = async (plan: string): Promise<any> => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
        const response = await apiConnector(
            'POST',
            `${BASE_URL}/subscriptions`,
            { plan },
            {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          );
        return response.data
    } catch (err: any) {
        console.log(err)
        throw err
    }
}

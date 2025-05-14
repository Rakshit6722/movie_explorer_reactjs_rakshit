import axios, { AxiosResponse } from 'axios'
import { apiConnector } from './interceptor/apiConnector'
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
        if (err?.status === 401) {
            toast.error(err?.response?.data?.error ?? 'Something went wrong, try again!')
        }
        else if (err?.status === 422) {
            toast.error(err?.response?.data?.error ?? 'Something went wrong, try again!')
        }
        else if (err?.status === 500) {
            toast.error(err?.response?.data?.error ?? 'Something went wrong, try again!')
        } else {
            toast.error(err?.message ?? 'Something went wrong, try again!')
        }

    }
}

export const registerApi = async (data: { first_name: string, last_name: string, email: string, mobile_number: string, password: string }) => {
    try {
        const response = await apiConnector('POST', `${BASE_URL}/signup`, data, {})
        return response
    } catch (err: any) {
        throw err
    }
}

export const logoutUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
        const response = await apiConnector('POST', `${BASE_URL}/logout`, null, null, null, true);
        return response
    } catch (err: any) {
        toast.error(err?.message ?? 'Something went wrong, try again!')
    }
}


export const userNotificationApi = async (data: { device_token: string, notifications_enabled: boolean }) => {

    try {
        const response = await apiConnector(
            'POST',
            `${BASE_URL}/update_preferences`,
            {
                device_token: data.device_token,
                notifications_enabled: data.notifications_enabled
            },
            null,
            null,
            true
        )
    } catch (err: any) {
        throw err
    }
}

export const addSubscriptioApi = async (plan: string): Promise<any> => {
    try {
        const response = await apiConnector(
            'POST',
            `${BASE_URL}/subscriptions`,
            { plan },
            null,
            null,
            true
        );
        return response.data
    } catch (err: any) {
        throw err
    }
}

export const getSubscriptionDetailsApi = async (): Promise<any> => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
        const response = await apiConnector(
            "GET",
            `${BASE_URL}/subscriptions`,
            null,
            null,
            null,
            true
        );
        return response?.data?.subscriptions
    } catch (err: any) {
        throw err
    }
}


export const updatePaymentStatus = async (sessionId: string | null): Promise<any> => {
    try {
        const response = await apiConnector(
            'GET',
            `${BASE_URL}/subscriptions/success?session_id=${sessionId}`,
        )
        return response
    } catch (err: any) {
        throw err
    }
}

export const updatePaymentCancelStatus = async (sessionId: string | null): Promise<any> => {
    try{
        const response = await apiConnector(
            "GET",
            `${BASE_URL}/subscriptions/cancel?session_id=${sessionId}`,
        )
        return response
    }catch(err: any){
        throw err
    }
}
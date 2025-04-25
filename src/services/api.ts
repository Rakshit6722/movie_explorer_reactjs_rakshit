import axios, { AxiosResponse } from 'axios'
import { apiConnector } from './apiConnector'
import { toast } from 'react-toastify'

const BASE_URL = 'https://movie-explorer-ror-akshay-katoch.onrender.com/api/v1'


export const loginApi = async (data: {email: string, password: string}) => {
    try{
        const response = await apiConnector('POST', `${BASE_URL}/login`, data, {})
        return response
    }catch(err: any){
        console.log(err)
        console.log(err?.status)
        
        if(err?.status === 401){
            toast.error(err?.response?.data?.error ?? 'Something went wrong, try again!')
        }
    }
}

export const registerApi = async (data: {first_name: string, last_name: string, email: string, mobile_number: string, password: string}) => {
    try{
        const response = await apiConnector('POST', `${BASE_URL}/signup`, data, {})
        return response
    }catch(err: any){
        console.log(err)
    }
}
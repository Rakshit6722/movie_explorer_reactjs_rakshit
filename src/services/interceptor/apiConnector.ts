import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { toast } from 'react-toastify'

const axiosInstance = axios.create({})

axiosInstance.interceptors.request.use(
    (config: any) => {
        if (config.requiesAuth !== false) {
            const token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }

        delete config.requiesAuth
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }else if(error.response.status === 500){
            toast.error("Internal server error")
        }
        return Promise.reject(error)
    }
)

export const apiConnector = (method: Method, url: string, data?: any, headers?: any, formData?: boolean | null, params?: any, requiresAuth?: boolean): Promise<AxiosResponse> => {
    return axiosInstance({
        method,
        url,
        data: data ? data : {},
        headers: {
            'Content-Type': formData ? 'multipart/form-data' : 'application/json',
            ...headers
        },
        params: params ? { ...params } : null,
        requiresAuth: requiresAuth ,
    } as AxiosRequestConfig)
}
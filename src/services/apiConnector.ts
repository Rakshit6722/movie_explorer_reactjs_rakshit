import axios, { AxiosResponse, Method } from 'axios'

const axiosInstance = axios.create({})

export const apiConnector = (method: Method, url: string, data?: any, headers?: any): Promise<AxiosResponse> => {
    return axiosInstance({
        method,
        url,
        data: data || undefined,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    })
}
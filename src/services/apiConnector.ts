import axios, { AxiosResponse, Method } from 'axios'

const axiosInstance = axios.create({})

export const apiConnector = (method: Method, url: string, data?: any, headers?: any, formData?: boolean, params?: any): Promise<AxiosResponse> => {
    return axiosInstance({
        method,
        url,
        data: data ? data : null,
        headers: {
            'Content-Type': formData ? 'multipart/form-data' : 'application/json',
            ...headers
        },
        params: params ? params : null,
    })
}
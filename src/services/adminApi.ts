import { apiConnector } from "./interceptor/apiConnector"

const BASE_URL = 'https://movie-explorer-rorakshaykat2003-movie.onrender.com/api/v1'


export const addMovie = async (data: any): Promise<any> => {
    try{
        const response = await apiConnector(
            "POST",
            `${BASE_URL}`,
            data,
            null,
            null,
            true
        )

        return response
    }catch(err: any){
        throw err
    }
}

export const updateMovieDetails = async (id: number, data: any): Promise<any> => {
    try{
        const response = await apiConnector(
            "PATCH",
            `${BASE_URL}/${id}`,
            data,
            null,
            null,
            true
        )

        return response
    }catch(err: any){
        throw err
    }
}


export const deleteMovie = async (id: number): Promise<any> => {
    try{
        const response = await apiConnector(
            "DELETE",
            `${BASE_URL}/${id}`,
            null,
            null,
            null,
            true
        )

        return response
    }catch(err: any){
        throw err
    }
}
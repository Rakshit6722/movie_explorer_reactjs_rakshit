import axios from "axios";
import { apiConnector } from "./interceptor/apiConnector";

const BASE_URL = `https://movie-explorer-rorakshaykat2003-movie.onrender.com/api/v1/movies`
const WISHLIST_BASE_URL = `https://movie-explorer-rorakshaykat2003-movie.onrender.com/api/v1`

export const getMovieByPageApi = async (page?: number, genre?: string | null, search?: string | null) => {
    if (genre === 'All') genre = null
    let apiUrl = ''
    if (!page) {
        apiUrl = `${BASE_URL}`
    } else {
        apiUrl = `${BASE_URL}?page=${page}`
    }
    try {
        const response = await apiConnector("GET", apiUrl, null, null, null, {
            genre: genre ? genre : null,
            page: page ? page : null,
            search: search ? search : null
        })
        if (response?.status === 200) {
            return { data: response.data?.movies, totalPages: response.data?.total_pages }
        } else {
            throw new Error("Failed to fetch movies")
        }
    } catch (err: any) {
        throw err
    }
}

export const getMoviesForHomePage = async () => {
    try {
        const response = await apiConnector(
            "GET",
            `${BASE_URL}/all`,
            null,
            null,
            null,
        )
        if (response?.status === 200) {
            return response?.data?.movies
        }
    } catch (err: any) {
        throw err
    }
}

export const getMovieDetails = async (id: number): Promise<any> => {
    try {
        const response = await apiConnector(
            "GET",
            `${BASE_URL}/${id}`,
            null,
            null,
            null,
            null
        )

        return response
    } catch (err: any) {
        throw err
    }
}

export const getWatchList = async (): Promise<any> => {
    try{
        const response = await apiConnector(
            "GET",
            `${WISHLIST_BASE_URL}/wishlist`,
            null,
            null,
            null,
            null,
            true
        )
        return response?.data
    }catch(err: any){
        throw err
    }
}

export const addToWatchList = async (movieId: number) => {
    try {
        const response = await apiConnector(
            "POST",
            `${WISHLIST_BASE_URL}/wishlist`,
            {
                movie_id: movieId
            },
            null,
            null,
            null,
            true
        )
        return response
    } catch (err: any) {
        throw err
    }
}

export const removeFromWatchList = async (movieId: number) => {
    try {
        const response = await apiConnector(
            "DELETE",
            `${WISHLIST_BASE_URL}/wishlist/${movieId}`,
            null,
            null,
            null,
            null,
            true
        )
        return response
    } catch (err: any) {
        throw err
    }
}

export const deleteWatchList = async () => {
    try{
        const response = await apiConnector(
            "DELETE",
            `${WISHLIST_BASE_URL}/wishlist`,
            null,
            null,
            null,
            null,
            true
        )
        return response?.data
    }catch(err: any){
        throw err
    }
}


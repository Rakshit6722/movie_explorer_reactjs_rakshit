import axios from "axios";
import { apiConnector } from "./interceptor/apiConnector";

const BASE_URL = `https://movie-explorer-rorakshaykat2003-movie.onrender.com/api/v1/movies`

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
            console.log("response from index", response?.data)
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


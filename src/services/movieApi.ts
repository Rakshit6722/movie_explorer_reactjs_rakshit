import { apiConnector } from "./apiConnector";

const BASE_URL = `https://movie-explorer-rorakshaykat2003-movie.onrender.com/api/v1/movies`

export const getMovieByPageApi = async (page?: number) => {
    let apiUrl = ''
    if (!page) {
        apiUrl = `${BASE_URL}`
    } else {
        apiUrl = `${BASE_URL}?page=${page}`
    }
    try {
        const response = await apiConnector("GET", apiUrl)
        if (response?.status === 200) {
            console.log("response", response.data)
            return response.data?.movies
        } else {
            throw new Error("Failed to fetch movies")
        }
    } catch (err: any) {
        console.error("API Error:", err.response ? err.response.data : err.message);
        throw err
    }
}

export const getMoviesForHomePage = async (pageCount: number) => {
    try{
        const pagesToFetch = Array.from({ length: pageCount }, (_, i) => i + 1);

        const responses = await Promise.all(
            pagesToFetch.map((page) => getMovieByPageApi(page))
        )

        const allMovies = responses.flatMap((response) => response);
        return allMovies
    }catch(err: any){
        console.error("API Error:", err.response ? err.response.data : err.message);
        throw err
    }
}
import { apiConnector } from "./apiConnector";

const BASE_URL = `https://movie-explorer-rorakshaykat2003-movie.onrender.com/api/v1/movies`

export const getMovieByPageApi = async (page?: number, genre?: string | null, search?: string | null) => {
    if(genre === 'All') genre = null
    let apiUrl = ''
    if (!page) {
        apiUrl = `${BASE_URL}`
    } else {
        apiUrl = `${BASE_URL}?page=${page}`
    }
    try {
        const response = await apiConnector("GET", apiUrl, null, null, null,{
            genre: genre ? genre : null,
            page: page ? page : null,
            search: search ? search : null
        })
        if (response?.status === 200) {
            return {data:response.data?.movies, totalPages: response.data?.total_pages}
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

        const allMovies = responses.flatMap((response) => response.data);
        return allMovies
    }catch(err: any){
        console.error("API Error:", err.response ? err.response.data : err.message);
        throw err
    }
}
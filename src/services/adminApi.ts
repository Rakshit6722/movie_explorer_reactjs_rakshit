import axios from "axios"
import { apiConnector } from "./apiConnector"

const BASE_URL = 'https://movie-explorer-rorakshaykat2003-movie.onrender.com/api/v1/movies'

export const creatMovieApi = async (movieData: any) => {
    const token = localStorage.getItem("token")?.trim()
    const authHeader = `Bearer ${token}`
    console.log(authHeader.split(' '))

    console.log("token", token)
    try{
        // const response = await apiConnector("POST", BASE_URL, movieData, {
        //     "Authorization": `Bearer${token}`,
        // })
        // const response = await axios.post(BASE_URL, movieData, {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     }
        // })
         const response = await fetch(BASE_URL, {
            method: "POST",
            headers:{
                "Authorization": `Bearer ${token}`,
            },
            body: movieData,
        })
        console.log("response", response)
    }catch(err: any){
        console.error("API Error:", err.response ? err.response.data : err.message);
        console.log(err.message)
    }
}
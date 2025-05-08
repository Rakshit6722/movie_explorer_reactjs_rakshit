import axios from "axios"
import { apiConnector } from "./apiConnector"
import { jwtDecode } from "jwt-decode"
import { toast } from "react-toastify"
import { setUser } from "../redux/slices/userSlice"

const BASE_URL = 'https://movie-explorer-rorakshaykat2003-movie.onrender.com/api/v1/movies'

const isTokenExpired = (token: string) => {
    try {
        const decodedToken = jwtDecode(token)
        if (!decodedToken.exp) return false

        const currentTime = Math.floor(Date.now() / 1000)
        return decodedToken.exp < currentTime
    } catch (err) {
        console.error("Error decoding token:", err)
        return true
    }
}

export const creatMovieApi = async (movieData: any, dispatch: any) => {
    const token = localStorage.getItem("token")?.trim()
    // if(token){
    //     if(isTokenExpired(token)){
    //         localStorage.removeItem("token")
    //         dispatch(setUser({}))
    //         toast.error("Session expired")
    //         return
    //     }
    // }
    // const authHeader = `Bearer ${token}`
    // console.log(authHeader.split(' '))

    // console.log("token", token)
    try{
    //     // const response = await apiConnector("POST", BASE_URL, movieData, {
    //     //     "Authorization": `Bearer${token}`,
    //     // })
    //     const response = await axios.post(BASE_URL, movieData, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         }
    //     })
         const response = await fetch(BASE_URL, {
            method: "POST",
            headers:{
                "Authorization": `Bearer ${token}`,
            },
            body: movieData,
        })
        console.log("response", response)

    console.log("inside function call")

    // const formData = new FormData();
    // formData.append('genre', 'Sci-Fi');
    // formData.append('plan', 'platinum');
    // formData.append('banner', new File([movieData.banner], 'pathaanCover.webp', { type: 'image/webp' }));
    // formData.append('director', 'Christopher Nolan');
    // formData.append('poster', new File([movieData.poster], 'jawanPoster.jpg', { type: 'image/jpeg' }));
    // formData.append('duration', '148');
    // formData.append('release_year', '2010');
    // formData.append('title', 'Inception');
    // formData.append('description', 'A thief who steals corporate secrets through dream infiltration.');
    // formData.append('rating', '8.8');

    // try {
    //     const token = localStorage.getItem('token');
    //     const response = await axios.post(
    //         'https://movie-explorer-rorakshaykat2003-movie.onrender.com/api/v1/movies',
    //         movieData,
    //         {
    //             headers: {
    //                 'accept': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //                 // Do NOT set 'Content-Type' header; axios will set it automatically for FormData
    //             }
    //         }
    //     );
    //     console.log('Movie created:', response.data);
    //     // Optionally show a success toast or redirect
    } catch (error: any) {
        console.error('Error creating movie:', error);
        // Optionally show an error toast
    }
};


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Movie } from "../../types/type";
import { getMoviesForHomePage } from "../../services/movieApi";


const initialState: {
    movies: Movie[];
    loading: boolean;
    error: string | null;
} = {
    movies: [],
    loading: false,
    error: null,
}

export const fetchMovies = createAsyncThunk<Movie[]>(
    "movies/fetchMovies",
    async(__, {rejectWithValue}) => {
        try{
            const data = await getMoviesForHomePage()
            return data
        }catch(err: any){
            return rejectWithValue(err.message || "Failed to fetch movies")
        }
    }
)

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies(state, action) {
            state.movies = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
        addMovie(state, action) {
            state.movies.push(action.payload)
        },
        removeMovie(state, action) {
            state.movies = state.movies.filter(movie => movie.id !== action.payload)
        },
        updateMovie(state, action) {
            const index = state.movies.findIndex(movie => movie.id === action.payload.id)
            if (index !== -1) {
                state.movies[index] = { ...state.movies[index], ...action.payload }
            }
        },
        resetMovies(state) {
            state.movies = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})


export const { setMovies, setLoading, setError, addMovie, removeMovie, updateMovie, resetMovies } = movieSlice.actions
export default movieSlice.reducer
import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from './slices/movieSlice'
import moodReducer from './slices/moodSlice'
import userReducer from './slices/userSlice'

const rootReducer = combineReducers({
    movie: movieReducer,
    mood: moodReducer,
    user: userReducer
})

export default rootReducer;
import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from './slices/movieSlice'
import moodReducer from './slices/moodSlice'
import userReducer from './slices/userSlice'
import notificationReducer from './slices/notificationSlice'

const rootReducer = combineReducers({
    movie: movieReducer,
    mood: moodReducer,
    user: userReducer,
    notification: notificationReducer
})

export default rootReducer;
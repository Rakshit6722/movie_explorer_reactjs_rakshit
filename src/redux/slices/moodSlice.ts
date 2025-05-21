import { createSlice } from "@reduxjs/toolkit";

interface MoodState{
    moodList: string[];
    selectedMood: string;
    error: string | null;
}

const initialState: MoodState = {
    moodList: ["happy", "sad", "angry", "excited", "bored"],
    selectedMood: "happy",
    error: null,
}

const moodSlice = createSlice({
    name: "mood",
    initialState,
    reducers: {
        setMood: (state, action) => {
            state.selectedMood = action.payload;
        },
        resetMood: (state) => {
            state.selectedMood = initialState.selectedMood;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
})

export const { setMood, resetMood, setError } = moodSlice.actions;
export default moodSlice.reducer;
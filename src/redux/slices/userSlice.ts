import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: {},
        isLoggedIn: false,
        token: null,
        loading: false,
        error: null,
        currentPlan: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload;
            state.isLoggedIn = true;
        },
        setCurrentPlan: (state, action) => {
            state.currentPlan = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        resetToken: (state) => {
            state.token = null;
        },
        resetUser: (state: any) => {
            state.userInfo = {};
            state.isLoggedIn = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    },
})

export const { setUser, setToken, resetUser, setError, resetToken, setIsLoggedIn, setCurrentPlan } = userSlice.actions;
export default userSlice.reducer;
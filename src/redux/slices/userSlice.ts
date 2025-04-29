import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: {},
        isLoggedIn: false,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload;
            state.isLoggedIn = true;
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
    },
})

export const { setUser, setToken, resetUser, setError, resetToken } = userSlice.actions;
export default userSlice.reducer;
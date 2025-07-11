import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const initialState = {
    user: null,
    loading: true,
    error: null,
    isAuthenticated: !!Cookies.get('authToken'),
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user || action.payload.staff;
            // state.user = action.payload.staff;
            state.isAuthenticated = !!state.user;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userLogout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
    },
})

export const { loginStart, loginSuccess, loginFailure, userLogout } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error
import { loginStart, loginSuccess, loginFailure, userLogout} from './authSlice'
import {login, logout, getUserInfo} from '../../services/authService'

export const loginThunk = (credentials) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const response = await login(credentials);
        dispatch(loginSuccess(response));
        return response;
    } catch (error) {
        dispatch(loginFailure(error.response?.data?.message || "Login failed"));
        throw error;
    }
}

export const logoutThunk = () => async (dispatch) => {
    try {
        await logout();
        dispatch(userLogout());
    } catch (error) {
        console.error("Logout failed:", error);
    }
}

export const fetchUserFromToken = () => async (dispatch) => {
    try {
        const user = await getUserInfo();
        dispatch(loginSuccess({staff: user}));
    } catch (error) {
        // dispatch(userLogout());
        console.error("Failed to fetch user info:", error);
    }
}
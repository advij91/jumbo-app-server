import axios from "axios";
import Cookies from "js-cookie";
// import axiosInstance from "./axiosInstance";

const AUTH_URL = import.meta.env.VITE_AUTH_URL;

// Token Management
const setTokens = ({ authToken, refreshToken }) => {
  // Use secure cookies only on HTTPS (production), lax for local dev
  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const cookieOptions = isLocalhost
    ? { secure: false, sameSite: "Lax", path: "/", expires: 7 }
    : { secure: true, sameSite: "Strict", path: "/", expires: 7 };
  Cookies.set("authToken", authToken, cookieOptions);
  Cookies.set("refreshToken", refreshToken, cookieOptions);
}

const clearTokens = () => {
  Cookies.remove("authToken");
  Cookies.remove("refreshToken");
};

const getAuthToken = () => Cookies.get("authToken");
const getRefreshToken = () => Cookies.get("refreshToken");

// ---- AXIOS INSTANCE WITH INTERCEPTORS ----
const api = axios.create();

api.interceptors.request.use(config => {
  // Best Practice: Attach token to every request if available
  const token = getAuthToken();
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(`${AUTH_URL}/refresh-token`, {
          refreshToken: getRefreshToken(),
        });
        setTokens(data);
        originalRequest.headers["Authorization"] = `Bearer ${data.authToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearTokens();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const login = async ({ staffid, password }) => {
  const { data } = await api.post(`${AUTH_URL}/login`, { staffid, password });
  setTokens(data);
  return data;
};

export const signup = async payload => {
  const { data } = await api.post(`${AUTH_URL}/signup`, payload);
  return data;
};

export const logout = () => {
  clearTokens();
};

export const getUserInfo = async () => {
  const { data } = await api.get(`${AUTH_URL}/me`);
  return data.user || data;
}
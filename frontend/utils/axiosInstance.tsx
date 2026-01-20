import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeUserDataFromLocalStorage,
  saveToken,
} from "./tokenUtils";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: "/api/",
});

axiosInstance.interceptors.request.use(
  (request) => {
    const access_token = getAccessToken();
    if (access_token) {
      request.headers.Authorization = `Bearer ${access_token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (responce) => responce,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) return;
        const response = await axios.post("/api/auth/refresh", {
          refreshToken,
        });
        const { access_token, refresh_token } = response.data;
        saveToken({ access_token, refresh_token });
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        toast.error("Session expired. Please log in again.");
        removeUserDataFromLocalStorage();
        return Promise.reject(refreshError);
      }
    }
    toast.error(
      "Error response: " + error?.response?.statusText || error.message
    );
    return Promise.reject(error);
  }
);

export default axiosInstance;

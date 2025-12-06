/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res: any) => res,
  (err: { response: { data: any }; message: any }) => {
    console.error("API Error:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default axiosInstance;

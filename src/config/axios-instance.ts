import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_XANO_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

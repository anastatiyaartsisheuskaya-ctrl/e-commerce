import axios from "axios";
import { auth } from "../lib/firebase";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL is not configured");
}

export const api = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const token = await currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

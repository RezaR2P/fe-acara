import enviroment from "@/config/enviroment";
import { SessionExtended } from "@/types/Auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: enviroment.API_URL,
  headers,
  timeout: 10000,
});

instance.interceptors.request.use(
  async (request) => {
    // Memastikan interceptor getSession hanya berjalan di browser (Client-side)
    if (typeof window !== "undefined") {
      const session: SessionExtended | null = await getSession();
      if (session?.accessToken) {
        request.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Opsional: Handle global error 401 (Unauthorized) jika token expired
    if (error.response?.status === 401) {
      // Logic handle token expired / redirect ke login jika diperlukan
    }
    return Promise.reject(error);
  },
);

export default instance;

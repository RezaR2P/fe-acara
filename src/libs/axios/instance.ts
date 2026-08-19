import enviroment from '@/config/enviroment';
import axios from 'axios';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

interface CustomSession extends Session {
  accessToken?: string;
}

const headers = {
  'Content-Type': 'application/json',
};

const instance = axios.create({
  baseURL: enviroment.API_URL,
  headers,
  timeout: 10000,
});

instance.interceptors.request.use(
  async (request) => {
    const session: CustomSession | null = await getSession();
    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

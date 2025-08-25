import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { api, setAccessToken } from './client';
import { ENDPOINTS } from './endpoints';

let refreshing = false;
let waiters: Array<(t: string | null) => void> = [];

declare module 'axios' {
  export interface AxiosRequestConfig { _retry?: boolean }
}

export function attach401Handler() {
  api.interceptors.response.use(
    (r: AxiosResponse) => r,
    async (error: AxiosError) => {
      const config = (error.config as InternalAxiosRequestConfig & { _retry?: boolean })!;
      const status = error.response?.status;

      if (status === 401 && !config._retry) {
        config._retry = true;

        if (refreshing) {
          return new Promise((resolve, reject) => {
            waiters.push((token) => {
              if (!token) return reject(error);
              config.headers = config.headers ?? {};
              config.headers.Authorization = `Bearer ${token}`;
              resolve(api(config));
            });
          });
        }

        refreshing = true;
        try {
          const res = await axios.post(ENDPOINTS.REFRESH_TOKEN, null, { withCredentials: true });

          const auth = res.headers?.['authorization'] as string | undefined;
          const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
          setAccessToken(token);

          waiters.forEach(w => w(token));
          waiters = [];

          if (token) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
            return api(config); 
          }
        } catch (e) {
          setAccessToken(null);
          waiters.forEach(w => w(null));
          waiters = [];

          return Promise.reject(error);
        } finally {
          refreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
}
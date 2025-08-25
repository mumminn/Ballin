import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    withCredentials: true,
});

let accessToken: string | null = sessionStorage.getItem('access') || null;

export const setAccessToken = (t: string | null) => {
  accessToken = t;
  if (t) sessionStorage.setItem('access', t);
  else sessionStorage.removeItem('access');
};

export const getAccessToken = () => accessToken;


api.interceptors.request.use((cfg) => {
  cfg.headers = cfg.headers ?? {};
  if (accessToken) (cfg.headers as any).Authorization = `Bearer ${accessToken}`;
  return cfg;
});
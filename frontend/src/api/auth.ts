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

      // 실패한 요청
      const config = (error.config as InternalAxiosRequestConfig & { _retry?: boolean })!;
      const status = error.response?.status;

      // 401에러에 실패 요청 재요청 전일 경우에만 리프레시 토큰 발급
      if (status === 401 && !config._retry) {
        config._retry = true;

        // 리프레시 토큰 요청하는 사용자가 있을 경우 대기열 등록
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

        // 리프레시 요청
        refreshing = true;
        try {
          const refreshClient = axios.create({
            baseURL: api.defaults.baseURL,
            withCredentials: true,
          });

          const res = await refreshClient.post(ENDPOINTS.REFRESH_TOKEN, null, { withCredentials: true });

          // 새로운 토큰 추출, 저장
          const auth = res.headers?.['authorization'] as string | undefined;
          const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
          setAccessToken(token);

          // 다음 대기 요청 시도
          waiters.forEach(w => w(token));
          waiters = [];

          // 401 에러로 실패한 요청 재시도
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
import { api, setAccessToken } from '../client';
import { ENDPOINTS } from "../endpoints";
import { LoginRequest } from "@/types/login";

export async function login(body: LoginRequest): Promise<string> {
  const res = await api.post(ENDPOINTS.LOGIN, body);

  const auth = res.headers['authorization'] as string | undefined;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;

  if (!token) {
    throw new Error('서버가 액세스 토큰을 내려주지 않았습니다.');
  }

  setAccessToken(token || null);
  return token;
}
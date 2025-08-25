import axios from "axios";
import { api, setAccessToken } from './client';
import { ENDPOINTS } from "./endpoints";

export async function finishKakaoLogin(code: string): Promise<string | null> {
  const res = await api.get(ENDPOINTS.KAKAO_LOGIN, { params: {code}});

  const auth = res.headers['authorization'] as string | undefined;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;

  setAccessToken(token || null);
  return token ?? null;
}
import { api } from "../client";
import { ENDPOINTS } from "../endpoints";
import { SignUpRequest } from "@/types/signup";

export async function register(body: SignUpRequest): Promise<void> {
  
    const res = await api.post(ENDPOINTS.SIGNUP, body)

    if (!(res.status === 204 || res.status === 200)) {
        throw new Error(`회원가입 실패 (status ${res.status})`);
      }
}
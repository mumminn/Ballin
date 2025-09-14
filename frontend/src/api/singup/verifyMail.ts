import { api } from "../client";
import { ENDPOINTS } from "../endpoints";
import { VerifyMailReqeust } from "@/types/signup";

export async function verify(body: VerifyMailReqeust): Promise<void> {
  
    const res = await api.post(ENDPOINTS.MAIL_VERIFY, body)

    if (!(res.status === 204 || res.status === 200)) {
        throw new Error(`이메일 인증 실패 (status ${res.status})`);
      }
}
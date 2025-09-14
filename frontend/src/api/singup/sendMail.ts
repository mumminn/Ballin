import { ApiResponse } from "@/types/api";
import { api } from "../client";
import { ENDPOINTS } from "../endpoints";
import { SendMailRequest, SendMailResponse } from "@/types/signup";

export async function send(body: SendMailRequest): Promise<SendMailResponse> {
  
    const { data } = await api.post<ApiResponse<SendMailResponse>>(ENDPOINTS.MAIL_SEND, body)

    if (!data?.isSuccess || data.result == null) {
        throw new Error(data?.message ?? "인증 메일 전송 실패");
      }

    return data.result;
}
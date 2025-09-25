import { ENDPOINTS } from "../endpoints";
import { api } from "../client";
import { ApiResponse } from "@/types/api";

export async function getHighlightsUrl(recordId: string): Promise<string> {
    const res = await api.get<ApiResponse<{url: string}>>(ENDPOINTS.RECORD_HIGHLIGHTS(recordId));
    if (!res.data?.isSuccess || !res.data.result?.url) {
      throw new Error(res.data?.message || "하이라이트 URL 조회 실패");
    }
    
    return res.data.result.url;
}
  
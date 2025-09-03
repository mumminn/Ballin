import { ENDPOINTS } from "../endpoints";
import { api } from '../client';
import { MatchRecordItem } from "@/types/record";
import { ApiResponse } from "@/types/api";

export async function getRecords(): Promise<MatchRecordItem[]> {
    const res = await api.get<ApiResponse<MatchRecordItem[]>>(ENDPOINTS.RECORD);
  
    if (!res.data?.isSuccess) {
      throw new Error(res.data?.message || "직관 기록 조회 실패");
    }
    
    return res.data.result ?? [];
  }
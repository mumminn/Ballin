import { ENDPOINTS } from "../endpoints";
import { api } from '../client';
import { ApiResponse } from "@/types/api";
import { Sport } from "@/types/calendar";

export async function getStadium(category: Sport): Promise<string[]>{
    const res = await api.get<ApiResponse<string[]>>(ENDPOINTS.MAP, { params: { category }});
  
    if (!res.data?.isSuccess) {
      throw new Error(res.data?.message || "방문 경기장 기록 조회 실패");
    }
    
    return Array.isArray(res.data.result) ? res.data.result : [];
}
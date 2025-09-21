import { ENDPOINTS } from "../endpoints";
import { api } from '../client';
import { UserResponse } from "@/types/setting";
import { ApiResponse } from "@/types/api";

export async function getUser(): Promise<UserResponse> {
    const { data } = await api.get<ApiResponse<UserResponse>>(ENDPOINTS.USERS);
  
    if (!data.isSuccess || !data.result) {
        throw new Error(data?.message ?? "회원 정보 조회 실패");
    }
    
    return data.result;
  }
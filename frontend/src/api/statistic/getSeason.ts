import { ENDPOINTS } from "../endpoints";
import { api } from '../client';
import { ApiResponse } from "@/types/api";
import { SeasonItem } from "@/types/statistic";

export async function getSeason(): Promise<SeasonItem[]> {
    const res = await api.get<ApiResponse<SeasonItem[]>>(ENDPOINTS.STATISTIC_SEASON);

    if (!res.data?.isSuccess) {
        throw new Error(res.data?.message || "시즌 조회 실패");
    }

    return res.data.result ?? [];
}
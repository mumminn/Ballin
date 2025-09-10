import { ENDPOINTS } from "../endpoints";
import { api } from '../client';
import { StatisticRequest, StatisticResponse, StatisticApiResponse } from "@/types/statistic";


export async function getStatistic(body: StatisticRequest): Promise<StatisticResponse> {
  
    const res = await api.post<StatisticApiResponse>(ENDPOINTS.STATISTIC, body)

    if(!res.data?.isSuccess){
        throw new Error(res.data?.message ?? "통계 조회 실패");
    }

    return res.data.result;

  }
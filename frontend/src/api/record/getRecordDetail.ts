import { ENDPOINTS } from "../endpoints";
import { api } from '../client';
import { RecordDetailItem } from "@/types/record";
import { ApiResponse } from "@/types/api";

export async function getRecordDetail(recordId: string): Promise<RecordDetailItem> {
    const { data } = await api.get<ApiResponse<RecordDetailItem>>(ENDPOINTS.RECORD_DETAIl(recordId));
  
    if (!data.isSuccess || !data.result) {
      throw new Error(data.message ?? "직관 기록 상세를 가져오지 못했습니다.");
    }
    return data.result;
  }
import { api } from '../client';
import { ApiResponse } from '@/types/api';
import { Stamp, StampsResult } from '@/types/calendar';
import { ENDPOINTS } from '../endpoints';

export async function fetchStamps(categoryId?: string): Promise<Stamp[]> {
  const url = categoryId ? ENDPOINTS.CALENDAR_STAMP_CATE(categoryId) : ENDPOINTS.CALENDAR_STAMP;

  const { data } = await api.get<ApiResponse<StampsResult>>(url);

  if (!data.isSuccess) {
    throw new Error(data.message || '요청 실패');
  }

  return data.result?.stamps ?? [];
}
import { api } from '../client';
import { ApiResponse } from '@/types/api';
import { TeamOption } from "@/types/record";
import { ENDPOINTS } from '../endpoints';
import { Sport } from '@/types/calendar';

export async function fetchTeams(categoryName: Sport): Promise<TeamOption[]> {
  const url = ENDPOINTS.RECORD_TEAM(categoryName)

  const { data } = await api.get<ApiResponse<TeamOption[]>>(url);

  if (!data.isSuccess) {
    throw new Error(data.message || '요청 실패');
  }

  return data.result ?? [];
}
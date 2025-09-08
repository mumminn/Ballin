import { ENDPOINTS } from "../endpoints";
import { api } from '../client';

export async function getRecordImageUrl(recordId: string): Promise<string> {
    const res = await api.get(ENDPOINTS.RECORD_IMAGE(recordId), { responseType: "blob" });
  
    return URL.createObjectURL(res.data);
  }
import { ENDPOINTS } from "../endpoints";
import { api } from '../client';

export async function deleteRecord(recordId: string): Promise<void> {
    const res = await api.delete(ENDPOINTS.RECORD_DELETE(recordId));
    if (!(res.status === 204 || res.status === 200)) {
        throw new Error(`삭제 실패 (status ${res.status})`);
      }
}
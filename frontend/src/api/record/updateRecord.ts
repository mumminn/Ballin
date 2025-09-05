import { ENDPOINTS } from "../endpoints";
import { api } from '../client';

export type UpdateRecordPayload = {
  date: string;
  category: "baseball" | "basketball";
  stadium: string;
  seat: string;
  myTeam: string;
  opponentTeam: string;
  myScore: number;
  opponentScore: number;
  review: string;
};

export async function updateRecord(
  recordId: string,
  data: UpdateRecordPayload,
  image?: File | null
): Promise<void> {
  const fd = new FormData();
  fd.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));
  if (image) fd.append("image", image);

  await api.put(ENDPOINTS.RECORD_DELETE(recordId), fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
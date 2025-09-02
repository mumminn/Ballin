import { Sport } from "@/types/calendar";
import { ENDPOINTS } from "../endpoints";
import { api } from '../client';

type MatchRecordRequest = {
    date: string,
    category: Sport,
    stadium: string,
    seat: string,
    myTeam: string,
    opponentTeam: string,
    myScore: number,
    opponentScore: number,
    review: string,
}

export async function createRecord(req: MatchRecordRequest, file?: File ){
    const fd = new FormData();

    fd.append(
        'request',
        new Blob([JSON.stringify(req)], { type: 'application/json' })
    );

    if (file) {
        fd.append('image', file);
    }

    const { data } = await api.post(ENDPOINTS.RECORD, fd);

    return data;
}
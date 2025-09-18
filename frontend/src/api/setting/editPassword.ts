import { EditPasswordRequest } from "@/types/setting";
import { ENDPOINTS } from "../endpoints";
import { api } from "../client";
import { ApiResponse } from "@/types/api";

export async function editPassword(body: EditPasswordRequest) : Promise<void> {
    
    const res = await api.post<ApiResponse<void>>(ENDPOINTS.EDIT_PASSWORD, body);

    return res.data.result;
}
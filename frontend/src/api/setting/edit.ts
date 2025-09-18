import { EditRequest } from "@/types/setting";
import { ENDPOINTS } from "../endpoints";
import { api } from "../client";
import { ApiResponse } from "@/types/api";

export async function edit (body: EditRequest) : Promise<void> {

    const res = await api.patch<ApiResponse<void>>(ENDPOINTS.EDIT, body);

    return res.data.result;
}
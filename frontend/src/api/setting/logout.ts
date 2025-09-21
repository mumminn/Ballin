import { api } from "../client";
import { ENDPOINTS } from "../endpoints";

export async function logout() : Promise<void> {
    return api.post(ENDPOINTS.LOGOUT);
}
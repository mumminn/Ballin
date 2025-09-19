import { api } from "../client";
import { ENDPOINTS } from "../endpoints";

export async function deleteUser() : Promise<void> {
    return api.delete(ENDPOINTS.USERS);
}

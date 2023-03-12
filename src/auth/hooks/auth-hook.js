import { getAuthData } from "../services/auth-service";

export const useAuth = () => {
    return getAuthData();
}
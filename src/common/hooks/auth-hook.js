import { getAuthData } from "../../auth/services/auth-service";

export const useAuth = () => {
    return getAuthData();
}
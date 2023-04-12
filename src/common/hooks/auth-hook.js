import { useContext } from "react";
import { AuthProviderContext } from "../../auth/contexts/AuthContext";

export const useAuth = () => {
    return useContext(AuthProviderContext);
}
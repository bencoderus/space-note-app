import { useRoutes } from "react-router-dom";
import { routerRoutes } from "../../routes";

export const AppRouter = () => {
  return useRoutes(routerRoutes);
};

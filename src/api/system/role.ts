import { http } from "@/utils/http";

export const useRoleApi = (id: number) => {
  return http.get("/role/" + id);
};

export const useRoleListApi = () => {
  return http.get("/role/all");
};

import { http } from "@/utils/http";

export const useOrgListApi = () => {
  return http.get("/dept/list");
};

export const useOrgApi = (id: Number) => {
  return http.get("/dept/" + id);
};

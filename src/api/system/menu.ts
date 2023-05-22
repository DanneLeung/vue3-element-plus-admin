import { http } from "@/utils/http";

export const useMenuListApi = () => {
  return http.get("/menu/children/1");
};

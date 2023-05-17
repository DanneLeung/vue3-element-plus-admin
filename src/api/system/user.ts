import { http } from "@/utils/http";

export const useUserInfoApi = () => {
  return http.get("/userinfo");
};

export const updatePasswordApi = (data: any) => {
  return http.post("/user/resetpwd", data);
};

export const useUserApi = (id: number) => {
  return http.get("/user/get/" + id);
};

export const useUserUpdateApi = (data: any) => {
  return http.post("/user/update", { data });
};

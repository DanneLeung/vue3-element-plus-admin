import { http } from "@/utils/http";

export type UserResult = {
  /** 超级管理员标记 */
  admin: boolean;
  /** 验证错误信息 */
  error: string;
  /** 用户名 */
  username: string;
  /** 当前登陆用户的角色 */
  roles: Array<string>;
  /** `token` */
  token: string;
  /** 用于调用刷新`token`的接口时所需的`token` */
  refreshToken: string;
  /** `token`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expiredAt: Date;
};

export type RefreshTokenResult = {
  /** `token` */
  token: string;
  /** 用于调用刷新`token`的接口时所需的`token` */
  refreshToken: string;
  /** `token`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expiredAt: Date;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "/login", { data });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refreshToken", { data });
};

import axios from "@/utils/service"
import type * as Login from "./types/login"

/** 获取登录验证码 */
export function getLoginCodeApi() {
  return axios.get<Login.LoginCodeResponseData>("login/code")
}

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  return axios.post<Login.LoginResponseData>("users/login", data)
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return axios.get<Login.UserInfoResponseData>("users/info")
}

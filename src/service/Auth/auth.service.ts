import { ApiHelper } from "../../helper/http";
import { LoginPayload, ResponseAuth, SignupPayload } from "./auth.interface";

export const login = (payload: LoginPayload) => {
  return ApiHelper.post<ResponseAuth, LoginPayload>("/auth", payload);
};

export const signup = (payload: SignupPayload) => {
  return ApiHelper.post<ResponseAuth, SignupPayload>("/users", payload);
};

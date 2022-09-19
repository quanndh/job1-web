import { ApiHelper } from "../../helper/http";

export const me = () => {
  return ApiHelper.get<any>("/users");
};

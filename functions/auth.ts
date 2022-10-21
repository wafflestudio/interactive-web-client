import { authInstance, LoginResponse, RefreshResponse } from "../api/api";

export const manageTokens = (data: RefreshResponse) => {
  localStorage.setItem("accessToken", data.access);
  authInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${data.access}`;
};

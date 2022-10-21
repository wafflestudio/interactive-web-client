import { authInstance, LoginResponse } from "../api/api";

export const manageTokens = (data: LoginResponse) => {
  const { accessToken, refreshToken } = data;
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("accessToken", accessToken);
  authInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
};

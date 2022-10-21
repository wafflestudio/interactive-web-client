import { authInstance, TokensType } from "../api/api";

export const manageTokens = (data: TokensType) => {
  localStorage.setItem("accessToken", data.access_token);
  authInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${data.access_token}`;
  if (!!data.refresh_token) {
    localStorage.setItem("refreshToken", data.refresh_token);
  }
};

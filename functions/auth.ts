import { authInstance, TokensType } from "../api/api";

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

export const manageTokens = (data: TokensType) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
  authInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${data.access_token}`;
  if (!!data.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
  }
};

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  authInstance.defaults.headers.common["Authorization"] = `Bearer`;
};

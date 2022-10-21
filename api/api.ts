import axios, { AxiosError } from "axios";
import { manageTokens } from "../functions/auth";
import { UserDataType } from "../types/types";

interface LoginRequest {
  user_id: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface SignupRequest extends LoginRequest {
  email: string;
  username: string;
}

export interface PutmeRequest {
  password?: string;
  email?: string;
  username?: string;
}

export const instance = axios.create({
  baseURL: "https://webgam-server.shop/",
});

export const authInstance = axios.create({
  baseURL: "https://webgam-server.shop/",
});
authInstance.defaults.headers.common["Authorization"] = "Bearer";

export const api = {
  _signup: async ({ user_id, username, email, password }: SignupRequest) => {
    const response = await instance.post<LoginResponse>("api/v1/signup/", {
      user_id,
      username,
      email,
      password,
    });
    return response;
  },

  _login: async ({ user_id, password }: LoginRequest) => {
    const response = await instance.post<LoginResponse>("api/v1/login/", {
      user_id,
      password,
    });
    return response;
  },

  _refresh: async (refresh: string) => {
    const response = await instance.post<LoginResponse>("api/v1/refresh/", {
      refresh,
    });
    return response;
  },

  //user CRUD
  _getme: async () => {
    const response = await authInstance.get<UserDataType>("api/v1/users/me/");
    return response;
  },

  _putme: async ({ username, email }: PutmeRequest) => {
    const response = await instance.put<UserDataType>("api/v1/users/me/", {
      username,
      email,
    });
    return response;
  },

  _deleteme: async () => {
    await instance.delete<UserDataType>("api/v1/users/me");
    return;
  },
};

authInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { config } = error;
    if (error.response?.status === 401 && error.message === "token_not_valid") {
      const originalRequest = config;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await api._refresh(refreshToken);
          manageTokens(data);
          originalRequest.headers!.Authorization = `Bearer ${data.accessToken}`;
          return authInstance(originalRequest);
        } catch (e) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  },
);

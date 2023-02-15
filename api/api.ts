import axios, { AxiosError } from "axios";
import { manageTokens, REFRESH_TOKEN_KEY } from "../functions/auth";
import { ProjectDataType, UserDataType } from "../types/types";

interface LoginRequest {
  user_id: string;
  password: string;
  auto: boolean;
}

export interface TokensType {
  access_token: string;
  refresh_token?: string;
}

export interface LoginResponse {
  user: UserDataType;
  message: string;
  token: TokensType;
}

type RefreshResponse = TokensType;

interface SignupRequest extends LoginRequest {
  email: string;
  username: string;
}

export interface PutmeRequest {
  password?: string;
  email?: string;
  username?: string;
}

export const instance = axios.create();
export const authInstance = axios.create();

authInstance.defaults.headers.common["Authorization"] = "Bearer ";

export const api = {
  _signup: async ({ user_id, username, email, password }: SignupRequest) => {
    const response = await instance.post<LoginResponse>("/api/signup/", {
      user_id,
      username,
      email,
      password,
    });
    return response;
  },

  _login: async ({ user_id, password, auto }: LoginRequest) => {
    const response = await instance.post<LoginResponse>("/api/login/", {
      user_id,
      password,
      auto,
    });
    return response;
  },

  _refresh: async () => {
    const response = await instance.post<RefreshResponse>("/api/refresh/", {});
    return response;
  },

  //user CRUD
  _getme: async () => {
    const response = await authInstance.get<UserDataType>("/api/users/me/");
    return response;
  },

  _putme: async ({ username, email }: PutmeRequest) => {
    const response = await authInstance.put<UserDataType>("/api/users/me/", {
      username,
      email,
    });
    return response;
  },

  _deleteme: async () => {
    await authInstance.delete<null>("/api/users/me/");
    return;
  },

  _getuser: async (id: string) => {
    const response = await authInstance.get<UserDataType>(`/api/users/${id}`);
    return response;
  },

  _getmyproject: async () => {
    const response = await authInstance.get<ProjectDataType[]>(
      "api/project/me/",
    );
    return response;
  },
  _postproject: async (title: string) => {
    const response = await authInstance.post<ProjectDataType[]>(
      "api/project/",
      { title },
    );
    return response;
  },
  _getProject: async (id: number) => {
    const response = await authInstance.get<ProjectDataType>(
      `api/project/${id}`,
    );
    return response;
  },
};

authInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { config } = error;
    if (
      error.response?.status === 401 ||
      (error.response?.status == 403 &&
        error.response?.data.code == "token_not_valid")
    ) {
      const originalRequest = config;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (refreshToken) {
        try {
          const { data } = await api._refresh(refreshToken);
          manageTokens(data);
          originalRequest.headers!.Authorization = `Bearer ${data.access_token}`;
          return authInstance(originalRequest);
        } catch (e) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  },
);

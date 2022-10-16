import axios from "axios";
import { UserDataType } from "../types/types";

interface LoginRequest {
  user_id: string;
  password: string;
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
  _ping: async () => {
    const response = await instance.get("/ping");
    return response;
  },

  _signup: async ({ user_id, username, email, password }: SignupRequest) => {
    const response = await instance.post<UserDataType>("api/v1/signup/", {
      user_id,
      username,
      email,
      password,
    });
    return response;
  },

  _login: async ({ user_id, password }: LoginRequest) => {
    const response = await instance.post<UserDataType>("api/v1/login/", {
      user_id,
      password,
    });
    return response;
  },

  _refresh: async (refresh: string) => {
    const response = await instance.post("api/v1/refresh/", { refresh });
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

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

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "/api" : "http://iwe-server.shop/",
  withCredentials: true,
});

// const setHeaderToken = (newToken: string | null) => {
//   if (newToken) {
//     instance.defaults.headers.common['Authorization'] = newToken
//   } else {
//     delete instance.defaults.headers.common['Authorization']
//   }
// }

// const ACCESS_TOKEN_KEY = 'accessToken'
// const loadToken = (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY)
// const storeToken = (newToken: string | null) => {
//   if (newToken) {
//     localStorage.setItem(ACCESS_TOKEN_KEY, newToken)
//   } else {
//     localStorage.removeItem(ACCESS_TOKEN_KEY)
//   }
// }

// export type AccessToken = string

// // used later in AuthPage
// export const _setAccessToken = (token: AccessToken | null) => {
//   setHeaderToken(token)
//   storeToken(token)
// }
// // used later in AuthPage
// export const _getAccessToken = () => loadToken()

// setHeaderToken(loadToken())

export const api = {
  _signup: async ({ user_id, username, email, password }: SignupRequest) => {
    const response = await instance.post<UserDataType>("/signup/", {
      user_id,
      username,
      email,
      password,
    });
    return response;
  },

  _login: async ({ user_id, password }: LoginRequest) => {
    const response = await instance.post<UserDataType>("login", {
      user_id,
      password,
    });
    return response;
  },

  _getme: async () => {
    const response = await instance.get<UserDataType>("users/me");
    return response;
  },

  _putme: async ({ username, email }: PutmeRequest) => {
    const response = await instance.put<UserDataType>(
      "users/me",
      {
        username,
        email,
      },
      {
        headers: {
          "X-CSRFToken": "",
        },
      },
    );
    return response;
  },

  _deleteme: async () => {
    await instance.delete<UserDataType>("users/me");
    return;
  },

  _getuser: async (id: number) => {
    const response = await instance.get<UserDataType>(`/${id}/`);
    return response;
  },
};

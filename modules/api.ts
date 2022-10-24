import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { TokensType } from "../api/api";
import { manageTokens } from "../functions/auth";
import { UserDataType } from "../types/types";
import { signIn, signOut } from "./auth";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (typeof token === "string") {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const { data } = await baseQuery("/refresh/", api, extraOptions);
    if (data) {
      const success = data as TokensType;
      manageTokens(success);
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("리프레시 실패");
      api.dispatch(signOut());
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users/me"],
  endpoints: (build) => ({
    getMe: build.query<UserDataType, void>({
      query: () => ({ url: `/users/me` }),
      providesTags: [{ type: "Users/me" }],
    }),
  }),
});

export const {
  useGetMeQuery,
  util: { getRunningOperationPromises },
} = api;

export const { getMe } = api.endpoints;

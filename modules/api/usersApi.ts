import { UserDataType, UserPutType } from "../../types/types";
import { api } from "./api";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<UserDataType, void>({
      query: () => ({ url: "/users/me/" }),
      providesTags: [{ type: "Users/me" }],
    }),
    putMe: build.mutation<UserDataType, UserPutType>({
      query: (body) => ({ method: "PUT", url: "/users/me/", body }),
      invalidatesTags: [{ type: "Users/me" }],
    }),
    deleteMe: build.mutation<UserDataType, void>({
      query: () => ({ method: "DELETE", url: "/users/me/" }),
      invalidatesTags: [{ type: "Users/me" }],
    }),
    getUser: build.query<UserDataType, number>({
      query: (body) => ({ url: `/users/me/${body}` }),
      providesTags: (result) => [{ type: "Users/other", id: result?.user_id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  usePutMeMutation,
  useDeleteMeMutation,
  useGetUserQuery,
} = usersApi;

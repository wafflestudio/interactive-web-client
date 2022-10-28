import { UserDataType, UserPutType } from "../../types/types";
import { api } from "./api";

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<UserDataType, void>({
      query: () => ({ url: "/users/me/" }),
      providesTags: [{ type: "Users/me" }],
    }),
    putMe: build.mutation<UserDataType, UserPutType>({
      query: () => ({ url: "/users/me/" }),
      invalidatesTags: [{ type: "Users/me" }],
    }),
    deleteMe: build.mutation<UserDataType, UserPutType>({
      query: () => ({ url: "/users/me/" }),
      invalidatesTags: [{ type: "Users/me" }],
    }),
    getUser: build.query<UserDataType, number>({
      query: (id) => ({ url: `/users/me/${id}` }),
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

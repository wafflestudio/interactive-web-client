import { ProjectDataType, UserDataType, UserPutType } from "../../types/types";
import { api } from "./api";

const projectApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllProject: build.query<ProjectDataType[], void>({
      query: () => ({ url: "/project/" }),
      providesTags: [{ type: "Project/all" }],
    }),
    getMyProject: build.query<ProjectDataType[], void>({
      query: () => ({ url: "/project/me/" }),
      providesTags: [{ type: "Project/me" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllProjectQuery, useGetMyProjectQuery } = projectApi;

import { ProjectDataType, UserDataType, UserPutType } from "../../types/types";
import { api } from "./api";

const projectApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllProject: build.query<
      {
        pages: { current: 1; has_next: boolean; has_previous: boolean };
        data: ProjectDataType[];
      },
      void
    >({
      query: () => ({ url: "/project/" }),
      providesTags: [{ type: "Project/all" }],
    }),
    getMyProject: build.query<ProjectDataType[], void>({
      query: () => ({ url: "/project/me/" }),
      providesTags: [{ type: "Project/me" }],
    }),
    getProject: build.query<ProjectDataType, number>({
      query: (id) => ({ url: `/project/${id}` }),
      providesTags: [{ type: "Project/current" }],
    }),
    postMyProject: build.mutation<ProjectDataType, { title: string }>({
      query: ({ title }) => ({
        method: "POST",
        url: `/project/`,
        body: { title },
      }),
      invalidatesTags: [{ type: "Project/me" }],
    }),
    putProjectTitle: build.mutation<
      ProjectDataType,
      { id: number; title: string }
    >({
      query: ({ id, title }) => ({
        method: "PUT",
        url: `/project/me/${id}/`,
        body: { title },
      }),
      invalidatesTags: [{ type: "Project/me" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllProjectQuery,
  useGetMyProjectQuery,
  useGetProjectQuery,
  usePostMyProjectMutation,
  usePutProjectTitleMutation,
} = projectApi;

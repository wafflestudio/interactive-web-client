import { ObjectDataType, UserDataType } from "../../types/types";
import { api } from "./api";

export interface ObjectPostType extends ObjectDataType {
  project_name: string;
}

interface ObjectResponseType extends Omit<ObjectPostType, "image"> {
  id: number;
  project: {
    id: number;
    writer: UserDataType;
    title: string;
    created_at: string;
    updated_at: string;
    html: null | string;
    js: null | string;
    css: null | string;
  };
  image: string;
  user: number;
}

const objectApi = api.injectEndpoints({
  endpoints: (build) => ({
    postObject: build.mutation<ObjectResponseType, FormData>({
      query: (object) => ({
        method: "POST",
        url: `/objects/`,
        body: object,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { usePostObjectMutation } = objectApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ICategory {
  id: string;
  name: string;
  movieCount?: number;
  slug?: string;
  createdAt?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/categories/",
    credentials: "include",
  }),
  tagTypes: ["Categories"],

  endpoints: (builder) => ({
    createCategory: builder.mutation<IApiResponse<ICategory>, { name: string }>(
      {
        query: (data) => ({
          url: "create",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Categories"],
      },
    ),

    categories: builder.query<IApiResponse<ICategory[]>, void>({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
  }),
});

export const { useCreateCategoryMutation, useCategoriesQuery } = movieApi;

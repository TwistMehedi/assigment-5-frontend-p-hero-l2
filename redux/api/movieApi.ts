import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/categories/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateCategoryMutation } = movieApi;

import { IApiResponse, ICategory } from "@/types/interface/movie.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/movie/",
    credentials: "include",
  }),
  tagTypes: ["Categories", "Movie"],

  endpoints: (builder) => ({
    createCategory: builder.mutation<IApiResponse<ICategory>, { name: string }>(
      {
        query: (data) => ({
          url: "create-category",
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

    createChannel: builder.mutation<IApiResponse<any>, FormData>({
      query: (channelData) => ({
        url: "create-channel",
        method: "POST",
        body: channelData,
      }),
      invalidatesTags: ["Movie"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useCategoriesQuery,
  useCreateChannelMutation,
} = movieApi;

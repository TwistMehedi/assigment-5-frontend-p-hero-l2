import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/review/` ||
      "http://localhost:5000/api/v1/review/",
    credentials: "include",
  }),
  tagTypes: ["Review"],

  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => ({
        url: "create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),

    getReviews: builder.query({
      query: (params) => ({
        url: "all-reviews",
        method: "GET",
        params: params,
      }),
      providesTags: ["Review"],
    }),
  }),
});

export const { useCreateReviewMutation, useGetReviewsQuery } = reviewApi;

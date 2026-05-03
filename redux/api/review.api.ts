import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/review/` ||
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
    allUserReviews: builder.query({
      query: () => ({
        url: "admin/all-reviews",
        method: "GET",
      }),
    }),
    updateReviewStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `review-update-status?id=${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Review"],
    }),
    myReviews: builder.query({
      query: () => ({
        url: "my-reviews",
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    allReviewsTestimonial: builder.query({
      query: () => ({
        url: "testimonial-reviews",
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
  useAllUserReviewsQuery,
  useUpdateReviewStatusMutation,
  useMyReviewsQuery,
  useAllReviewsTestimonialQuery,
} = reviewApi;

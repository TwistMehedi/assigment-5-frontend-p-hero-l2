import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/dashboard` ||
      "http://localhost:5000/api/v1/user/dashboard/",
    credentials: "include",
  }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    getProviderDashboard: builder.query({
      query: () => ({
        url: "creator",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getSharedUser: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    myPurchasedAll: builder.query({
      query: () => ({
        url: "puchaed-movies-and-series-by-user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetProviderDashboardQuery,
  useGetSharedUserQuery,
  useMyPurchasedAllQuery,
} = userApi;

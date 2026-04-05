import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payment/` ||
      "http://localhost:5000/api/v1/payment/",
    credentials: "include",
  }),
  tagTypes: ["Payment"],

  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (data) => ({
        url: "create-checkout-session",
        method: "POST",
        body: data,
      }),
    }),

    verify: builder.query({
      query: (sessionId) => ({
        url: `verify?sessionId=${sessionId}`,
        method: "GET",
      }),
    }),

    checkPurchase: builder.query({
      query: (itemId) => ({
        url: `check-purchase/${itemId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCheckoutMutation, useVerifyQuery, useCheckPurchaseQuery } =
  paymentApi;

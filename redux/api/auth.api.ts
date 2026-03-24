import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/auth",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (registerData) => ({
        url: "register",
        method: "POST",
        body: registerData,
      }),
    }),
  }),
});

export const {} = authApi;

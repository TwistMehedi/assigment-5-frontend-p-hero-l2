import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/` ||
      "http://localhost:5000/api/v1/auth/",
    credentials: "include",
  }),
  tagTypes: ["Auth"],

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (registerData) => ({
        url: "register",
        method: "POST",
        body: registerData,
      }),
      invalidatesTags: ["Auth"],
    }),

    verifyEmail: builder.mutation({
      query: ({ email, otp }) => ({
        url: "verify-otp",
        method: "POST",
        body: { email, otp },
      }),
      invalidatesTags: ["Auth"],
    }),

    loginUser: builder.mutation({
      query: (fromData) => ({
        url: "login",
        method: "POST",
        body: fromData,
      }),
      invalidatesTags: ["Auth"],
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "email-otp/request-password-reset",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "email-otp/reset-password",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "change-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    logOutUser: builder.mutation({
      query: () => ({
        url: "logout-user",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    socialLogin: builder.mutation({
      query: (session) => ({
        url: "social-login",
        method: "POST",
        body: session,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyEmailMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useLogOutUserMutation,
  useSocialLoginMutation,
} = authApi;

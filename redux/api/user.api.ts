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
    getAdminDashboard: builder.query({
      query: () => ({
        url: "admin",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getAllTransactions: builder.query({
      query: ({ page, search }) => ({
        url: "all-transactions",
        method: "GET",
        params: { page, searchTerm: search },
      }),
      providesTags: ["User"],
    }),

    getAllMoviesForAdmin: builder.query({
      query: () => ({
        url: "all-movies-admin",
        method: "GET",
      }),
    }),

    getAllSeriesForAdmin: builder.query({
      query: () => ({
        url: "admin-all-series",
        method: "GET",
      }),
    }),

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

    users: builder.query({
      query: (search) => ({
        url: `users`,
        method: "GET",
        params: { search },
      }),
      providesTags: ["User"],
    }),

    updateRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `update-user-role`,
        method: "PATCH",
        body: { id, role },
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAdminDashboardQuery,
  useGetAllTransactionsQuery,
  useGetAllMoviesForAdminQuery,
  useGetAllSeriesForAdminQuery,
  useGetProviderDashboardQuery,
  useGetSharedUserQuery,
  useMyPurchasedAllQuery,
  useUsersQuery,
  useUpdateRoleMutation,
  useDeleteUserMutation
} = userApi;

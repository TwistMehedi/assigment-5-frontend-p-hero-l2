import {
  IApiResponse,
  ISeason,
  ISeries,
} from "@/types/interface/series.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const seriesApi = createApi({
  reducerPath: "seriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/series/` ||
      "http://localhost:5000/api/v1/series/",
    credentials: "include",
  }),
  tagTypes: ["Series"],

  endpoints: (builder) => ({
    createSeries: builder.mutation<IApiResponse<ISeries>, FormData>({
      query: (seriesData) => ({
        url: "upload",
        method: "POST",
        body: seriesData,
      }),
      invalidatesTags: ["Series"],
    }),

    allSeries: builder.query({
      query: (params) => ({
        url: "all-series",
        method: "GET",
        params: params,
      }),
      providesTags: ["Series"],
    }),

    series: builder.query({
      query: (id) => ({
        url: `series/${id}`,
        method: "GET",
      }),
      providesTags: ["Series"],
    }),

    mySerieses: builder.query<IApiResponse<ISeries[]>, void>({
      query: () => ({
        url: "my-serieses",
        method: "GET",
      }),
      providesTags: ["Series"],
    }),

    updateSeries: builder.mutation<
      IApiResponse<ISeries>,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `update-series/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Series"],
    }),

    singleSeries: builder.query<IApiResponse<ISeries>, string>({
      query: (id) => ({
        url: `my-series/${id}`,
        method: "GET",
      }),
      providesTags: ["Series"],
    }),

    createSeason: builder.mutation<IApiResponse<ISeries>, FormData>({
      query: (seasonData) => ({
        url: "upload-season",
        method: "POST",
        body: seasonData,
      }),
      invalidatesTags: ["Series"],
    }),

    singleSeason: builder.query<IApiResponse<ISeason>, string>({
      query: (seasonid) => ({
        url: `season/${seasonid}`,
        method: "GET",
      }),
      providesTags: ["Series"],
    }),

    addEpisode: builder.mutation<IApiResponse<ISeason>, FormData>({
      query: (episodeData) => ({
        url: "upload-episode",
        method: "POST",
        body: episodeData,
      }),
      invalidatesTags: ["Series"],
    }),

    updateSeriesAdmin: builder.mutation({
      query: ({ id, isPremium }) => ({
        url: "update-series-admin",
        method: "PATCH",
        body: { id, isPremium },
      }),
      invalidatesTags: ["Series"],
    }),

    deleteSeriesAdmin: builder.mutation({
      query: (id) => ({
        url: "delete-series-admin",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Series"],
    }),

    updateEpisode: builder.mutation({
      query: (data) => ({
        url: "update-episode",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Series"],
    }),

    deleteEpisode: builder.mutation({
      query: (id) => ({
        url: `delete-episode/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Series"],
    }),
  }),
});

export const {
  useCreateSeriesMutation,
  useAllSeriesQuery,
  useSeriesQuery,
  useMySeriesesQuery,
  useUpdateSeriesMutation,
  useSingleSeriesQuery,
  useCreateSeasonMutation,
  useSingleSeasonQuery,
  useAddEpisodeMutation,
  useUpdateSeriesAdminMutation,
  useDeleteSeriesAdminMutation,
  useUpdateEpisodeMutation,
  useDeleteEpisodeMutation,
} = seriesApi;

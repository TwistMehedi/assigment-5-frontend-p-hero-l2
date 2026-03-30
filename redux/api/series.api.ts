import { IApiResponse, ISeries } from "@/types/interface/series.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateSeries } from "../../../backend/src/modules/series/series.controller";

export const seriesApi = createApi({
  reducerPath: "seriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/series/",
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
  }),
});

export const {
  useCreateSeriesMutation,
  useMySeriesesQuery,
  useUpdateSeriesMutation,
  useSingleSeriesQuery,
  useCreateSeasonMutation,
} = seriesApi;

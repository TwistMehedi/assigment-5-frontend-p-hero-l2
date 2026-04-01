import {
  IApiMovieResponse,
  IApiResponse,
  ICategory,
  IChannel,
  IMovieResponse,
} from "@/types/interface/movie.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/movie/` ||
      "http://localhost:5000/api/v1/movie/",
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

    categories: builder.query<any, void>({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),

    createChannel: builder.mutation<IApiResponse<IChannel>, FormData>({
      query: (channelData) => ({
        url: "create-channel",
        method: "POST",
        body: channelData,
      }),
      invalidatesTags: ["Movie"],
    }),

    channels: builder.query<IApiResponse<IChannel[]>, void>({
      query: () => ({
        url: "channels",
        method: "GET",
      }),
      providesTags: ["Movie"],
    }),

    updateChannel: builder.mutation<
      IApiResponse<IChannel>,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `update-channel/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Movie"],
    }),

    deleteChanele: builder.mutation({
      query: (id) => ({
        url: `delete-channel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Movie"],
    }),

    getChannel: builder.query<IApiResponse<IChannel>, string>({
      query: (id) => ({
        url: `channel/${id}`,
        method: "GET",
      }),
      providesTags: ["Movie"],
    }),

    allMovies: builder.query<
      any,
      { search: string; category: string; page?: number; limit?: number }
    >({
      query: (params) => ({
        url: "movies",
        method: "GET",
        params: params,
      }),
      providesTags: ["Movie"],
    }),

    movie: builder.query({
      query: (id) => ({
        url: `movie/${id}`,
        method: "GET",
      }),
      providesTags: ["Movie"],
    }),

    uploadMovie: builder.mutation<IApiMovieResponse<IMovieResponse>, FormData>({
      query: (movieData) => ({
        url: "upload-movie",
        method: "POST",
        body: movieData,
      }),
      invalidatesTags: ["Movie"],
    }),

    myMovie: builder.query<Record<string, any>, string>({
      query: (id) => ({
        url: `my-movie/${id}`,
        method: "GET",
      }),
      providesTags: ["Movie"],
    }),

    getMyMovies: builder.query<IApiMovieResponse<IMovieResponse[]>, any>({
      query: (params) => ({
        url: "my-movies",
        method: "GET",
        params: params,
      }),
      providesTags: ["Movie"],
    }),

    updateMovie: builder.mutation<
      any,
      { id: string | string[]; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `update-movie/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Movie"],
    }),

    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `delete-movie/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Movie"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useCategoriesQuery,
  useCreateChannelMutation,
  useChannelsQuery,
  useUpdateChannelMutation,
  useDeleteChaneleMutation,
  useGetChannelQuery,
  useAllMoviesQuery,
  useMovieQuery,
  useUploadMovieMutation,
  useMyMovieQuery,
  useGetMyMoviesQuery,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = movieApi;

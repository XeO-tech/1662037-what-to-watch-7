import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IMovieDataRaw,
  IMovieDataAdapted,
  IAuthdataRaw,
  IAuthDataAdapted,
  ILoginFormData,
  IReviewData,
  IReviewFormData,
} from '../../common/types';
import {
  adaptMovieDataToClient,
  adaptAuthDataToClient,
} from '../../utils/adapters';
import { RootState } from '../../app/store';

interface IReviewPostQueryInput {
  id: string;
  body: IReviewFormData;
}

interface IFavoritesPostqueryInput {
  id: string;
  status: number;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://7.react.pages.academy/wtw',
    prepareHeaders: (headers, { getState }) => {
      const token =
        localStorage.getItem('token') ?? (getState() as RootState).auth.token;
      if (token) {
        headers.set('x-token', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Reviews', 'Favorites'],
  endpoints: (builder) => ({
    fetchMovies: builder.query<IMovieDataAdapted[], void>({
      query: () => '/films',
      transformResponse: (response: IMovieDataRaw[]) =>
        response.map((movieData) => adaptMovieDataToClient(movieData)),
    }),

    fetchPromoMovie: builder.query<IMovieDataAdapted, void>({
      query: () => '/promo',
      keepUnusedDataFor: 0,
      transformResponse: (response: IMovieDataRaw) =>
        adaptMovieDataToClient(response),
    }),

    fetchMovie: builder.query<IMovieDataAdapted, string>({
      query: (id) => ({ url: `films/${id}` }),
      keepUnusedDataFor: 0,
      transformResponse: (response: IMovieDataRaw) =>
        adaptMovieDataToClient(response),
    }),

    fetchSimilarMovies: builder.query<IMovieDataAdapted[], string>({
      query: (id) => ({ url: `films/${id}/similar` }),
      transformResponse: (response: IMovieDataRaw[]) =>
        response.map((movieData) => adaptMovieDataToClient(movieData)),
    }),

    fetchFavoritesMovies: builder.query<IMovieDataAdapted[], void>({
      query: () => '/favorite',
      providesTags: ['Favorites'],
      transformResponse: (response: IMovieDataRaw[]) =>
        response.map((movieData) => adaptMovieDataToClient(movieData)),
    }),

    fetchMovieReviews: builder.query<IReviewData[], string>({
      query: (id) => ({ url: `comments/${id}` }),
      providesTags: ['Reviews'],
    }),

    fetchAuthData: builder.query<IAuthDataAdapted, void>({
      query: () => '/login',
      transformResponse: (response: IAuthdataRaw) =>
        adaptAuthDataToClient(response),
    }),

    fetchLogin: builder.mutation<IAuthDataAdapted, ILoginFormData>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response: IAuthdataRaw) =>
        adaptAuthDataToClient(response),
    }),

    fetchLogout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'DELETE',
      }),
    }),

    postReview: builder.mutation<IReviewData, IReviewPostQueryInput>({
      query: ({ id, body }) => ({
        url: `/comments/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Reviews'],
    }),

    postToFavorites: builder.mutation<
      IMovieDataAdapted,
      IFavoritesPostqueryInput
    >({
      query: ({ id, status }) => ({
        url: `/favorite/${id}/${status}`,
        method: 'POST',
      }),
      invalidatesTags: ['Favorites'],
      transformResponse: (response: IMovieDataRaw) =>
        adaptMovieDataToClient(response),
    }),
  }),
});

export const useFetchMoviesQueryState =
  apiSlice.endpoints.fetchMovies.useQueryState;
export const {
  useFetchMoviesQuery,
  useFetchMovieQuery,
  useFetchSimilarMoviesQuery,
  useFetchFavoritesMoviesQuery,
  useFetchMovieReviewsQuery,
  useFetchPromoMovieQuery,
  useFetchAuthDataQuery,
  useFetchLoginMutation,
  useFetchLogoutMutation,
  usePostReviewMutation,
  usePostToFavoritesMutation,
} = apiSlice;

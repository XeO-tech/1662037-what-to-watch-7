import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMovieDataRaw, IMovieDataAdapted, IAuthdataRaw, IAuthDataAdapted, ILoginFormData, ICommentData, ICommentFormData } from '../../common/types';
import { adaptMovieDataToClient, adaptAuthDataToClient } from '../../utils/adapters';
import { RootState } from '../../app/store';

interface ICommentPostQueryInput {
  id: string,
  body: ICommentFormData,
}

interface IFavoritesPostqueryInput {
  id: string,
  status: number,
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://7.react.pages.academy/wtw',
    prepareHeaders: (headers, { getState} ) => {
      const token = localStorage.getItem('token') ??(getState() as RootState).auth.token;
      if (token) {
        headers.set('x-token', token);
      }
      return headers;
    },
  }),
  tagTypes: ['MovieData', 'AllMoviesData', 'PromoMovie', 'Comments'],
  endpoints: (builder) => ({

    fetchMovies: builder.query<IMovieDataAdapted[], void>({
      query: () => '/films',
      providesTags: ['AllMoviesData'],
      transformResponse: (response: IMovieDataRaw[]) => response.map((movieData) => adaptMovieDataToClient(movieData)),
    }),

    fetchPromoMovie: builder.query<IMovieDataAdapted, void>({
      query: () => '/promo',
      providesTags: ['PromoMovie'],
      transformResponse: (response: IMovieDataRaw) => adaptMovieDataToClient(response),
    }),

    fetchMovie: builder.query<IMovieDataAdapted, string>({
      query: (id) => ({ url: `films/${id}` }),
      providesTags: ['MovieData'],
      transformResponse: (response: IMovieDataRaw) => adaptMovieDataToClient(response),
    }),

    fetchSimilarMovies: builder.query<IMovieDataAdapted[], string>({
      query: (id) => ({ url: `films/${id}/similar` }),
      transformResponse: (response: IMovieDataRaw[]) => response.map((movieData) => adaptMovieDataToClient(movieData)),
    }),

    fetchMovieComments: builder.query<ICommentData[], string>({
      query: (id) => ({ url: `comments/${id}` }),
      providesTags: ['Comments'],
    }),

    fetchAuthData: builder.query<IAuthDataAdapted, void>({
      query: () => '/login',
      transformResponse: (response: IAuthdataRaw) => adaptAuthDataToClient(response),
    }),

    fetchLogin: builder.mutation<IAuthDataAdapted, ILoginFormData>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response: IAuthdataRaw) => adaptAuthDataToClient(response),
    }),

    fetchLogout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'DELETE',
      }),
    }),

    postComment: builder.mutation<ICommentData, ICommentPostQueryInput>({
      query: ({id, body}) => ({
        url: `/comments/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comments'],
    }),

    postToFavorites: builder.mutation<IMovieDataAdapted, IFavoritesPostqueryInput>({
      query: ({id, status}) => ({
        url: `/favorite/${id}/${status}`,
        method: 'POST',
      }),
      invalidatesTags: ['MovieData', 'PromoMovie'],
      transformResponse: (response: IMovieDataRaw) => adaptMovieDataToClient(response),
    }),
  }),
});

export const useFetchMoviesQueryState = apiSlice.endpoints.fetchMovies.useQueryState;
export const {
  useFetchMoviesQuery,
  useFetchMovieQuery,
  useFetchSimilarMoviesQuery,
  useFetchMovieCommentsQuery,
  useFetchPromoMovieQuery,
  useFetchAuthDataQuery,
  useFetchLoginMutation,
  useFetchLogoutMutation,
  usePostCommentMutation,
  usePostToFavoritesMutation,
} = apiSlice;


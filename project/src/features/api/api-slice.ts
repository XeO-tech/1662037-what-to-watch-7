import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMovieDataRaw, IMovieDataAdapted, IAuthdataRaw, IAuthDataAdapted, ILoginFormData } from '../../common/types';
import { adaptMovieDataToClient, adaptAuthDataToClient } from '../../utils/adapters';
import { RootState } from '../../app/store';


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
  endpoints: (builder) => ({
    fetchMovies: builder.query<IMovieDataAdapted[], void>({
      query: () => '/films',
      transformResponse: (response: IMovieDataRaw[]) => response.map((movieData) => adaptMovieDataToClient(movieData)),
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
  }),
});

export const useFetchMoviesQueryState = apiSlice.endpoints.fetchMovies.useQueryState;
export const { useFetchMoviesQuery, useFetchAuthDataQuery, useFetchLoginMutation, useFetchLogoutMutation } = apiSlice;


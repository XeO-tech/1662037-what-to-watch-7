import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMovieDataRaw, IMovieDataAdapted, IAuthdataRaw, IAuthDataAdapted } from '../../common/types';
import { adaptMovieDataToClient, adaptAuthDataToClient } from '../../utils/adapters';
import { setAuthStatus } from '../authorization/authorization-slice';
import { AuthStatus } from '../../const';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://7.react.pages.academy/wtw',
    prepareHeaders: (headers) => {
      headers.set('x-token', localStorage.getItem('token') ?? '');
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
      transformResponse: (response: IAuthdataRaw) => {
        setAuthStatus(AuthStatus.AUTH);
        localStorage.setItem('token', response.token);
        return adaptAuthDataToClient(response);
      },
    }),
  }),
});

export const useFetchMoviesQueryState = apiSlice.endpoints.fetchMovies.useQueryState;
export const { useFetchMoviesQuery, useFetchAuthDataQuery } = apiSlice;


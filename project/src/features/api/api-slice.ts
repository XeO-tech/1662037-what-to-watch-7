import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMovieDataRaw, IMovieDataAdapted } from '../../common/types';
import { adaptMovieToClient } from '../../utils/adapter';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://7.react.pages.academy/wtw'}),
  endpoints: (builder) => ({
    fetchMovies: builder.query<IMovieDataAdapted[], void>({
      query: () => '/films',
      transformResponse: (response: IMovieDataRaw[]) => response.map((movieData) => adaptMovieToClient(movieData)),
    }),
  }),
});

export const useFetchMoviesQueryState = apiSlice.endpoints.fetchMovies.useQueryState;
export const { useFetchMoviesQuery } = apiSlice;


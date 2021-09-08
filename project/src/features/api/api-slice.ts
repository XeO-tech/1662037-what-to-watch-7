import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMovieDataRaw } from '../../common/types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://7.react.pages.academy/wtw'}),
  endpoints: (builder) => ({
    fetchMovies: builder.query<IMovieDataRaw[], null>({
      query: () => '/films',
    }),
  }),
});

export const { useFetchMoviesQuery } = apiSlice;

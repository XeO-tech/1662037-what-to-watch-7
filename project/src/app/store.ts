import { configureStore } from '@reduxjs/toolkit';
import genreReducer from '../features/genres/genres-slice';
import moviesReducer from '../features/movies/movies-slice';
import authReducer from '../features/auth/auth-slice';
import { apiSlice } from '../features/api/api-slice';

export const store = configureStore({
  reducer: {
    genre: genreReducer,
    movies: moviesReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


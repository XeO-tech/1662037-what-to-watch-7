/* This is the wrapper on basic reduxe createStore function.
It does the same job plus automatically turn on redux devtool and adds thunk middleware and some other stuff.
*/
import { configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import genreReducer from '../features/genres/genres-slice';
import moviesReducer from '../features/movies/movies-slice';

//Configure store will automatically combine reducers from object in reducer parameter
export const store = configureStore({
  reducer: {
    genre: genreReducer,
    movies: moviesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

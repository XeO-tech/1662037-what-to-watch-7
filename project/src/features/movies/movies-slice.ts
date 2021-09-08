import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovieDataAdapted } from '../../common/types';

interface moviesState {
  moviesList: IMovieDataAdapted[],
}

const initialState: moviesState = {
  moviesList: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<IMovieDataAdapted[]>) {
      state.moviesList = action.payload;
    },
  },
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;

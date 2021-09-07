import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilmDataAdapted } from '../../common/types';

interface moviesState {
  moviesList: IFilmDataAdapted[],
}

const initialState: moviesState = {
  moviesList: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<IFilmDataAdapted[]>) {
      state.moviesList = action.payload;
    },
  },
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;

// DUCKS pattern

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GenreState {
  currentGenre: string,
}

const initialState: GenreState = {
  currentGenre: 'allGenres',
};

const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    setGenre(state, action: PayloadAction<string>) {
      // it's okay to do this because immer library in redux toolkit makes it immutable under the hood
      state.currentGenre = action.payload;
    },
  },
});

export const { setGenre } = genreSlice.actions;
export default genreSlice.reducer;

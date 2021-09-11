import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_GENRE } from '../../const';

interface IGenreState {
  currentGenre: string,
}

const initialState: IGenreState = {
  currentGenre: INITIAL_GENRE,
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

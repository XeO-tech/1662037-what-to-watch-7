import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../../const';

interface IAuthState {[key: string]: string}

type AuthValuesType = typeof AuthStatus[keyof typeof AuthStatus]

const initialState: IAuthState = {
  authorizationStatus: AuthStatus.UNKNOWN,
  userName: '',
  avatarUrl: '',
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setAuthStatus(state, action: PayloadAction<AuthValuesType>) {
      state.authorizationStatus = action.payload;
    },
    logout(state) {
      state.authorizationStatus = AuthStatus.NO_AUTH;
    },
  },
});

export const { setAuthStatus, logout } = authorizationSlice.actions;
export default authorizationSlice.reducer;

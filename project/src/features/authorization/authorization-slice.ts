import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../../const';

interface AuthorizationState {
  authorizationStatus: string,
}

type AuthorizationValuesType = typeof AuthStatus[keyof typeof AuthStatus]

const initialState: AuthorizationState = {
  authorizationStatus: AuthStatus.UNKNOWN,
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setAuthStatus(state, action: PayloadAction<AuthorizationValuesType>) {
      state.authorizationStatus = action.payload;
    },
    logout(state) {
      state.authorizationStatus = AuthStatus.NO_AUTH;
    },
  },
});

export const { setAuthStatus, logout } = authorizationSlice.actions;
export default authorizationSlice.reducer;

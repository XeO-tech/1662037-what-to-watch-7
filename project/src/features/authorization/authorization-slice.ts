import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';

interface AuthorizationState {
  authorizationStatus: string,
}

type AuthorizationValuesType = typeof AuthorizationStatus[keyof typeof AuthorizationStatus]

const initialState: AuthorizationState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setAuthStatus(state, action: PayloadAction<AuthorizationValuesType>) {
      state.authorizationStatus = action.payload;
    },
    logout(state) {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    },
  },
});

export const { setAuthStatus, logout } = authorizationSlice.actions;
export default authorizationSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../../const';

interface IUserData {
  userName: string,
  avatarUrl: string,
}

interface IAuthState extends IUserData {
  authStatus: string,
}

type AuthValuesType = typeof AuthStatus[keyof typeof AuthStatus]

const initialState: IAuthState = {
  authStatus: AuthStatus.UNKNOWN,
  userName: '',
  avatarUrl: '',
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setAuthStatus(state, action: PayloadAction<AuthValuesType>) {
      state.authStatus = action.payload;
    },
    setUserData(state, action: PayloadAction<IUserData>) {
      state.userName = action.payload.userName;
      state.avatarUrl = action.payload.avatarUrl;
    },
    logout(state) {
      state.authStatus = AuthStatus.NO_AUTH;
    },
  },
});

export const { setAuthStatus, setUserData, logout } = authorizationSlice.actions;
export default authorizationSlice.reducer;

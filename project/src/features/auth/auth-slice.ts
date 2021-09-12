import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../../const';

interface IUserData {
  userName: string,
  avatarUrl: string,
  token: string,
}

interface IAuthState extends IUserData {
  status: string,
}

type AuthValuesType = typeof AuthStatus[keyof typeof AuthStatus]

const initialState: IAuthState = {
  status: AuthStatus.UNKNOWN,
  userName: '',
  avatarUrl: '',
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStatus(state, action: PayloadAction<AuthValuesType>) {
      state.status = action.payload;
    },
    setUserData(state, action: PayloadAction<IUserData>) {
      state.userName = action.payload.userName;
      state.avatarUrl = action.payload.avatarUrl;
      state.token = action.payload.token;
    },
    clearUserData(state) {
      state.userName = '';
      state.avatarUrl = '';
      state.token = '';
    },
  },
});

export const { setAuthStatus, setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;

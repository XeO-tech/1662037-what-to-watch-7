import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../../const';
import { apiSlice } from '../api/api-slice';

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
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        apiSlice.endpoints.fetchAuthData.matchFulfilled,
        apiSlice.endpoints.fetchLogin.matchFulfilled),
      (state, {payload}) => {
        state.token = payload.token;
        state.userName = payload.name;
        state.avatarUrl = payload.avatarUrl;
        state.status = AuthStatus.AUTH;
        localStorage.setItem('token', payload.token);
      },
    );
    builder.addMatcher(
      isAnyOf(
        apiSlice.endpoints.fetchAuthData.matchRejected,
        apiSlice.endpoints.fetchLogout.matchFulfilled),
      (state) => {
        state.token = '';
        state.userName = '';
        state.avatarUrl = '';
        state.status = AuthStatus.NO_AUTH;
        localStorage.removeItem('token');
      },
    );
  },
});

export const { setAuthStatus, setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;

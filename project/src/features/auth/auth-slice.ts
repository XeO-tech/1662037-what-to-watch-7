import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../../const';

interface IUserData {
  userName: string,
  avatarUrl: string,
}

interface IAuthState extends IUserData {
  status: string,
}

type AuthValuesType = typeof AuthStatus[keyof typeof AuthStatus]

const initialState: IAuthState = {
  status: AuthStatus.UNKNOWN,
  userName: '',
  avatarUrl: '',
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
    },
  },
});

export const { setAuthStatus, setUserData } = authSlice.actions;
export default authSlice.reducer;

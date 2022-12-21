import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken?: string | undefined;
  refreshTokenExpired?: boolean | undefined;
  loginType?: string | undefined;
}

const initialState: AuthState = {
  accessToken: undefined,
  refreshTokenExpired: undefined,
  loginType: undefined,
};

const alertSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.refreshTokenExpired = false;
    },
    setLoginType: (state, action: PayloadAction<string>) => {
      state.loginType = action.payload;
    },
    setRefreshTokenExpired: (state, action: PayloadAction<boolean>) => {
      state.refreshTokenExpired = action.payload;
    },
  },
});

export const { setAccessToken, setLoginType, setRefreshTokenExpired } =
  alertSlice.actions;

export default alertSlice;

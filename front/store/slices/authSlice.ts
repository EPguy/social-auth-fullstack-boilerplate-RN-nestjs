import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken?: string | undefined;
  refreshTokenExpired?: boolean | undefined;
}

const initialState: AuthState = {
  accessToken: undefined,
  refreshTokenExpired: undefined,
};

const alertSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshTokenExpired = false;
    },
    setRefreshTokenExpired: (state, action: PayloadAction<boolean>) => {
      state.refreshTokenExpired = action.payload;
    },
  },
});

export const { setAccessToken, setRefreshTokenExpired } = alertSlice.actions;

export default alertSlice;

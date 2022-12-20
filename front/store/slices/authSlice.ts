import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | undefined;
}

const initialState: AuthState = {
  accessToken: undefined,
};

const alertSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { setAccessToken } = alertSlice.actions;

export default alertSlice;

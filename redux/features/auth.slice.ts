import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  cookies: {
    sessionToken: null,
    token: null,
    refreshToken: null,
  },
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: any; cookies: any }>,
    ) => {
      state.user = action.payload.user;
      state.cookies = {
        sessionToken: action.payload.cookies.sessionToken,
        token: action.payload.cookies.token,
        refreshToken: action.payload.cookies.refreshToken,
      };
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.cookies = {
        sessionToken: null,
        token: null,
        refreshToken: null,
      };
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { logoutThunk } from "./authThunks";

const initialState = {
  accessToken: null,
  refreshToken: null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, () => initialState);
    builder.addCase(logoutThunk.rejected, () => initialState);
  },
});

export const { setToken, setUserInfo, resetAuth } = authSlice.actions;
export default authSlice;

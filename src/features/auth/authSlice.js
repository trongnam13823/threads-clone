import { createSlice } from "@reduxjs/toolkit";
import { logoutThunk } from "./authThunks";
import paths from "@/configs/paths";

const initialState = {
  accessToken: null,
  refreshToken: null,
  userInfo: null,
  columns: [
    { id: 0, path: paths.home },
    { id: 1, path: paths.activity },
    { id: 2, path: paths.search },
    { id: 3, path: paths.search },
    { id: 4, path: paths.search },
    { id: 5, path: paths.search },
  ],
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
    reorderColumns(state, action) {
      //
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, () => initialState);
    builder.addCase(logoutThunk.rejected, () => initialState);
  },
});

export const { setToken, setUserInfo, resetAuth, reorderColumns } = authSlice.actions;
export default authSlice;

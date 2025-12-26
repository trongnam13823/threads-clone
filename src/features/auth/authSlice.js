import { createSlice } from "@reduxjs/toolkit";
import { logoutThunk } from "./authThunks";
import paths from "@/configs/paths";

const initialState = {
  accessToken: null,
  refreshToken: null,
  userInfo: null,
  columns: [
    { id: 1, path: paths.home },
    { id: 2, path: paths.search },
    { id: 3, path: paths.activity },
    { id: 4, path: paths.home },
    { id: 5, path: paths.search },
    { id: 6, path: paths.activity },
    { id: 7, path: paths.home },
    { id: 8, path: paths.search },
    { id: 9, path: paths.activity },
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

    setColumns(state, action) {
      state.columns = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, () => initialState);
    builder.addCase(logoutThunk.rejected, () => initialState);
  },
});

export const { setToken, setUserInfo, resetAuth, reorderColumns, setColumns } = authSlice.actions;
export default authSlice;

import { createSlice } from "@reduxjs/toolkit";
import { logoutThunk } from "./authThunks";
import paths from "@/configs/paths";

const initialState = {
  accessToken: null,
  refreshToken: null,
  userInfo: null,
  columns: [
    { id: 0, path: paths.home },
    { id: 5, path: paths.search },
    { id: 6, path: paths.activity },
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
      const { fromIndex, toIndex } = action.payload;

      if (fromIndex === toIndex) return;

      const [moved] = state.columns.splice(fromIndex, 1);
      state.columns.splice(toIndex, 0, moved);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, () => initialState);
    builder.addCase(logoutThunk.rejected, () => initialState);
  },
});

export const { setToken, setUserInfo, resetAuth, reorderColumns } = authSlice.actions;
export default authSlice;

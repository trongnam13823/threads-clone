import { createSlice } from '@reduxjs/toolkit';
import { logoutThunk } from './authThunks';
import paths from '@/configs/paths';

const initialState = {
  accessToken: null,
  refreshToken: null,
  userInfo: null,
  columns: [{ id: 1, path: paths.home }],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },

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

    pinColumn(state, action) {
      const path = action.payload;

      const maxId = Math.max(...state.columns.map((col) => col.id), 0);
      state.columns.push({ id: maxId + 1, path });
    },

    unpinColumn(state, action) {
      const id = action.payload;
      state.columns = state.columns.filter((col) => col.id !== id);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, () => initialState);
    builder.addCase(logoutThunk.rejected, () => initialState);
  },
});

export const {
  setToken,
  setUserInfo,
  resetAuth,
  reorderColumns,
  setColumns,
  pinColumn,
  unpinColumn,
} = authSlice.actions;
export default authSlice;

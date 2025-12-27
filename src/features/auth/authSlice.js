import { createSlice } from '@reduxjs/toolkit';
import { logoutThunk } from './authThunks';
import paths from '@/configs/paths';

const initialState = {
  accessToken: null,
  refreshToken: null,
  userInfo: null,
  columns: [
    { id: 1, path: paths.home },
    { id: 2, path: paths.following },
    // { id: 3, path: paths.ghostPosts },
    // { id: 4, path: paths.forYou },
  ],
};

const authSlice = createSlice({
  name: 'auth',
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

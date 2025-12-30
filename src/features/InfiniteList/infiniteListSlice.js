import { FEED_TYPES } from '@/constants/feedTypes';
import { SEARCH_TYPES } from '@/constants/searchType';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lists: {
    [FEED_TYPES.FOR_YOU]: { page: 1, reload: { signal: {} } },
    [FEED_TYPES.FOLLOWING]: { page: 1, reload: { signal: {} } },
    [FEED_TYPES.GHOST]: { page: 1, reload: { signal: {} } },
    [SEARCH_TYPES.USER_SUGGESTIONS]: { page: 1, reload: { signal: {} } },
    [SEARCH_TYPES.GLOBAL_SEARCH]: { page: 1, reload: { signal: {} } },
  },
};

const infiniteListSlice = createSlice({
  name: 'infiniteList',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.lists[action.payload.key].page = action.payload.page;
    },
    triggerReload(state, action) {
      state.lists[action.payload].reload.signal = {};
    },
  },
});

export const { setPage, triggerReload } = infiniteListSlice.actions;
export default infiniteListSlice;

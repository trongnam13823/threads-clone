import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { setText } = searchSlice.actions;
export default searchSlice;

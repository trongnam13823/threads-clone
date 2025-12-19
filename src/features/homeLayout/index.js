import paths from "@/configs/paths";
import { createSlice } from "@reduxjs/toolkit";

export const DEFAULT_COLUMN_ID = "default";

const DEFAULT_COLUMN = {
  id: DEFAULT_COLUMN_ID,
  start: 1,
};

const initialState = {
  columns: [
    DEFAULT_COLUMN,
    {
      id: "1",
      path: paths.activity,
      start: 1,
    },
    {
      id: "2",
      path: paths.search,
      start: 1,
    },
    // {
    //   id: "3",
    //   path: paths.activity,
    //   start: 1,
    // },
    // {
    //   id: "4",
    //   path: paths.activity,
    //   start: 1,
    // },
  ],
};

export const homeLayoutSlice = createSlice({
  name: "homeLayout",
  initialState,
  reducers: {
    setColumns(state, action) {
      const nextColumns = action.payload ?? [];
      const hasDefault = nextColumns.some(
        (col) => col.id === DEFAULT_COLUMN_ID,
      );
      state.columns = hasDefault
        ? nextColumns
        : [DEFAULT_COLUMN, ...nextColumns];
    },

    addColumn(state, action) {
      const maxId = state.columns.reduce(
        (max, col) => Math.max(max, Number(col.id)),
        0,
      );
      state.columns.push({
        id: String(maxId + 1),
        path: paths.home,
        start: 1,
        pages: [],
        ...action.payload,
      });
    },

    removeColumn(state, action) {
      const id = action.payload;
      if (id === DEFAULT_COLUMN_ID) return;
      state.columns = state.columns.filter((col) => col.id !== id);
    },
  },
});

export const { setColumns, addColumn, removeColumn } = homeLayoutSlice.actions;

export default homeLayoutSlice.reducer;

import paths from "@/configs/paths";
import { createSlice } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";

export const DEFAULT_COLUMN_ID = "default";

const DEFAULT_COLUMN = {
  id: DEFAULT_COLUMN_ID,
  path: paths.home,
};

const initialState = {
  columns: [
    DEFAULT_COLUMN,
    { id: "1", path: paths.activity },
    { id: "2", path: paths.search },
    { id: "3", path: paths.search },
  ],
};

export const homeLayoutSlice = createSlice({
  name: "homeLayout",
  initialState,
  reducers: {
    setColumns(state, action) {
      const nextColumns = action.payload ?? [];
      const hasDefault = nextColumns.some((col) => col.id === DEFAULT_COLUMN_ID);

      state.columns = hasDefault ? nextColumns : [DEFAULT_COLUMN, ...nextColumns];
    },

    reorderColumns(state, action) {
      const { activeId, overId } = action.payload;
      if (!overId || activeId === overId) return;

      const oldIndex = state.columns.findIndex((c) => c.id === activeId);
      const newIndex = state.columns.findIndex((c) => c.id === overId);

      state.columns = arrayMove(state.columns, oldIndex, newIndex);
    },

    addColumn(state, action) {
      const maxId = state.columns.reduce((max, col) => Math.max(max, Number(col.id)), 0);

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
      state.columns = state.columns.filter((c) => c.id !== id);
    },
  },
});

export const { setColumns, reorderColumns, addColumn, removeColumn } = homeLayoutSlice.actions;

export default homeLayoutSlice;

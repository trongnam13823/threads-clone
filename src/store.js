import { configureStore } from "@reduxjs/toolkit";
import homeLayoutReducer from "./features/homeLayout";

export const store = configureStore({
  reducer: {
    homeLayout: homeLayoutReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import authApi from "./services/auth/authApi";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import splashSlice from "./features/splash/splashSlice";

const persistConfig = {
  key: "auth",
  storage: storage.default || storage,
  whitelist: ["accessToken", "refreshToken"],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
  reducer: {
    splash: splashSlice.reducer,
    auth: persistedAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
});

export const persistor = persistStore(store);

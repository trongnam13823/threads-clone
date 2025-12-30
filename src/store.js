import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import authApi from './services/auth/authApi';
import postsApi from './services/posts/postsApi';
import searchApi from './services/search/searchApi';
import followApi from './services/follow/followApi';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import splashSlice from './features/splash/splashSlice';
import infiniteListSlice from './features/InfiniteList/infiniteListSlice';
import searchSlice from './features/search/searchSlice';

const persistConfig = {
  key: 'auth',
  storage: storage.default || storage,
  whitelist: ['accessToken', 'refreshToken'],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
  reducer: {
    splash: splashSlice.reducer,
    infiniteList: infiniteListSlice.reducer,
    search: searchSlice.reducer,
    auth: persistedAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [followApi.reducerPath]: followApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, postsApi.middleware, searchApi.middleware, followApi.middleware),
});

export const persistor = persistStore(store);

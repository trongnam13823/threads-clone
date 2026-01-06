import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import authApi from './services/auth/authApi';
import postsApi from './services/posts/postsApi';
import searchApi from './services/search/searchApi';
import usersApi from './services/users/usersApi';
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
import searchSlice from './features/search/searchSlice';
import themeSlice from './features/theme/themeSlice';

const persistConfig = {
  key: 'auth',
  storage: storage.default || storage,
  whitelist: ['accessToken', 'refreshToken'],
};

const themePersistConfig = {
  key: 'theme',
  storage: storage.default || storage,
  whitelist: ['theme'],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);
const persistedThemeReducer = persistReducer(themePersistConfig, themeSlice.reducer);

export const store = configureStore({
  reducer: {
    splash: splashSlice.reducer,
    search: searchSlice.reducer,
    auth: persistedAuthReducer,
    theme: persistedThemeReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, postsApi.middleware, searchApi.middleware, usersApi.middleware),
});

export const persistor = persistStore(store);

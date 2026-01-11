import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import authService from './services/auth/authService';
import postService from './services/post/postService';
import searchService from './services/search/searchService';
import userService from './services/user/userService';
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
  whitelist: ['accessToken', 'refreshToken', 'columns'],
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
    [authService.reducerPath]: authService.reducer,
    [postService.reducerPath]: postService.reducer,
    [searchService.reducerPath]: searchService.reducer,
    [userService.reducerPath]: userService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authService.middleware,
      postService.middleware,
      searchService.middleware,
      userService.middleware
    ),
});

export const persistor = persistStore(store);

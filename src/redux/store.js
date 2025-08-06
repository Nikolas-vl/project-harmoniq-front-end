import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import authReducer from './auth/authSlice';
import loaderReducer from './loader/loaderSlice';
import userReducer from './user/userSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken'],
};
const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: [
    'id',
    'name',
    'saved',
    'avatarUrl',
    'articlesAmount',
    'userArticles',
    'savedArticles',
  ],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    loader: loaderReducer,
    user: persistedUserReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

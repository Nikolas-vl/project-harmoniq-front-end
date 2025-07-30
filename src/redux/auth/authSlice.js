import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refreshUser, register } from './authOperations';

const initialState = {
  user: {
    id: null,
    name: null,
    saved: [],
    avatarUrl: null,
    articlesAmount: 0,
  },
  userArticles: [],
  savedArticles: [],
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const cleanUser = user => {
  if (!user) return null;
  return {
    id: user._id,
    name: user.name,
    saved: user.saved,
    avatarUrl: user.avatarUrl,
    articlesAmount: user.articlesAmount,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = cleanUser(action.payload.user);

        state.userArticles = action.payload.userArticles || [];
        state.savedArticles = action.payload.savedArticles || [];
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = cleanUser(action.payload.user);
        state.userArticles = action.payload.userArticles || [];
        state.savedArticles = action.payload.savedArticles || [];
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, state => {
        state.user = {
          name: null,
          saved: [],
          avatarUrl: null,
          articlesAmount: 0,
          id: null,
        };
        state.userArticles = [];
        state.savedArticles = [];
        state.accessToken = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = cleanUser(action.payload.user);
        state.userArticles = action.payload.userArticles || [];
        state.savedArticles = action.payload.savedArticles || [];
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export default authSlice.reducer;

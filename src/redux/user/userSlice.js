import { createSlice } from '@reduxjs/toolkit';
import { login, register, logout } from '../auth/authOperations';
import { fetchUserProfile } from './userOperations';

const initialState = {
  id: null,
  name: null,
  saved: [],
  avatarUrl: null,
  articlesAmount: 0,
  userArticles: [],
  savedArticles: [],
};

export const cleanUserData = user => {
  if (!user) return null;
  return {
    id: user._id,
    name: user.name,
    saved: user.saved || [],
    avatarUrl: user.avatarUrl || null,
    articlesAmount: user.articlesAmount || 0,
    userArticles: user.userArticles || [],
    savedArticles: user.savedArticles || [],
  };
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserState: () => initialState,
    addSavedArticleId: (state, action) => {
      const idsSet = new Set(state.saved);
      idsSet.add(action.payload);
      state.saved = Array.from(idsSet);
    },
    removeSavedArticleId: (state, action) => {
      const idToRemove = action.payload;
      const idsSet = new Set(state.saved);
      idsSet.delete(idToRemove);
      state.saved = Array.from(idsSet);
      state.savedArticles = state.savedArticles.filter(
        article => article._id !== idToRemove
      );
    },
    updateUserData: (state, action) => {
      Object.assign(state, cleanUserData(action.payload));
    },
    addUserArticle: (state, action) => {
      state.userArticles.push(action.payload);
    },
    removeUserArticle: (state, action) => {
      const idToRemove = action.payload;
      state.userArticles = state.userArticles.filter(
        article => article._id !== idToRemove
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const user = action.payload.user;
        Object.assign(state, cleanUserData(user));
      })
      .addCase(register.fulfilled, (state, action) => {
        const user = action.payload.user;
        Object.assign(state, cleanUserData(user));
      })
      .addCase(logout.fulfilled, state => {
        Object.assign(state, initialState);
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const { user, userArticles, savedArticles } = action.payload;
        Object.assign(state, cleanUserData(user));
        state.userArticles = userArticles || [];
        state.savedArticles = savedArticles || [];
      });
  },
});

export const {
  addSavedArticleId,
  removeSavedArticleId,
  updateUserData,
  addUserArticle,
  removeUserArticle,
} = userSlice.actions;
export const { clearUserState } = userSlice.actions;

export default userSlice.reducer;

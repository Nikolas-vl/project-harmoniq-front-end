export const selectUserName = state => state.auth.user.name;
export const selectUserId = state => state.auth.user.id;
export const selectUserSaved = state => state.auth.user.saved;
export const selectUserAvatarUrl = state => state.auth.user.avatarUrl;
export const selectUserArticlesAmount = state => state.auth.user.articlesAmount;

export const selectUserArticles = state => state.auth.userArticles;
export const selectSavedArticles = state => state.auth.savedArticles;

export const selectAccessToken = state => state.auth.accessToken;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;

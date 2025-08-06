export const selectUserId = state => state.user.id;
export const selectUserName = state => state.user.name;
export const selectUserSaved = state => state.user.saved;
export const selectUserAvatarUrl = state => state.user.avatarUrl;
export const selectUserArticlesAmount = state => state.user.articlesAmount;

export const selectUserArticles = state => state.user.userArticles;
export const selectSavedArticles = state => state.user.savedArticles;

export const selectUserName = state => state.auth.user.name;
export const selectUserId = state => state.auth.user.id;
export const selectUserEmail = state => state.auth.user.email;
export const selectUserToken = state => state.auth.token;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;

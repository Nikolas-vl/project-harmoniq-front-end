let navigateCallback = null;

export const setNavigateHandler = cb => {
  navigateCallback = cb;
};

export const navigateTo = path => {
  if (navigateCallback) {
    navigateCallback(path);
  }
};

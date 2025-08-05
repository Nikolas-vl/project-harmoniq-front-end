import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { showLoader } = loaderSlice.actions;
export default loaderSlice.reducer;

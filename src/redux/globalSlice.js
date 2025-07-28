import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    startLoading: state => {
      state.isLoading = true;
    },

    stopLoading: state => {
      state.isLoading = false;
    },
  },
});

export const { setLoading, startLoading, stopLoading } = globalSlice.actions;
export default globalSlice.reducer;

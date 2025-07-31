import {
  createSlice,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';

const initialState = {
  loadingCount: 0,
  isLoading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isPending, state => {
        state.loadingCount += 1;
        state.isLoading = true;
      })
      .addMatcher(isFulfilled, state => {
        state.loadingCount = Math.max(0, state.loadingCount - 1);
        if (state.loadingCount === 0) state.isLoading = false;
      })
      .addMatcher(isRejected, state => {
        state.loadingCount = Math.max(0, state.loadingCount - 1);
        if (state.loadingCount === 0) state.isLoading = false;
      });
  },
});

export default globalSlice.reducer;

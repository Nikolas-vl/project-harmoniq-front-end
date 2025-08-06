import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';
import { selectUserId } from '../user/userSelectors';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = selectUserId(state);

    if (!userId) {
      return thunkAPI.rejectWithValue('No user ID found in state');
    }

    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

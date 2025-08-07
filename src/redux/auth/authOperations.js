import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthHeader, clearAuthHeader } from '../../api/axios';
import toast from 'react-hot-toast';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkApi) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      const { accessToken, user } = response.data.data;
      setAuthHeader(accessToken);
      toast.success('Login successful!');
      return { accessToken, user };
    } catch (e) {
      toast.error('Login error!');
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkApi) => {
    try {
      const response = await axiosInstance.post('/auth/register', credentials);
      const { accessToken, user } = response.data.data;
      setAuthHeader(accessToken);
      toast.success('Registration and login successful!');
      return { accessToken, user };
    } catch (e) {
      if (e.response && e.response.data && e.response.data.errors) {
        toast.error('Registration error!');
        return thunkApi.rejectWithValue(e.response.data.errors);
      }
      toast.error('Server error!');
      return thunkApi.rejectWithValue({ general: 'Server error' });
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    await axiosInstance.post('/auth/logout');
    clearAuthHeader();
    toast.success('Logged out successfully!');
  } catch (e) {
    toast.error('Logout error!');
    return thunkApi.rejectWithValue(e.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;

    if (!token) {
      return thunkAPI.rejectWithValue('No token');
    }

    try {
      const response = await axiosInstance.post('/auth/refresh');
      const { accessToken, user } = response.data.data;

      setAuthHeader(accessToken);

      return { accessToken, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

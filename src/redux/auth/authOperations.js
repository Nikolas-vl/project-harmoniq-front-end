import { toast } from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { setAuthHeader, clearAuthHeader } from '../../api/axios';

const prepareAuth = thunkAPI => {
  const state = thunkAPI.getState();
  const token = state.auth.token;
  if (!token) throw new Error('No token');
  setAuthHeader(token);
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkApi) => {
    try {
      const response = await axios.post('/auth/register', credentials);
      setAuthHeader(response.data.token);
      toast.success('Registration successful!');
      return response.data;
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

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkApi) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      setAuthHeader(response.data.token);
      toast.success('Login successful!');
      return response.data;
    } catch (e) {
      toast.error('Login error!');
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    await axios.post('/auth/logout');
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
    try {
      prepareAuth(thunkAPI);
      const response = await axios.get('/auth/current');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

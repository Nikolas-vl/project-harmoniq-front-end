import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { setAuthHeader, clearAuthHeader } from '../../api/axios';
import { toast } from 'react-hot-toast';
import { startLoading, stopLoading } from '../globalSlice';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkApi) => {
    const { dispatch } = thunkApi;
    try {
      dispatch(startLoading());
      const response = await axios.post('/auth/login', credentials);
      const { accessToken, user, userArticles, savedArticles } =
        response.data.data;
      setAuthHeader(accessToken);
      toast.success('Login successful!');
      return { accessToken, user, userArticles, savedArticles };
    } catch (e) {
      toast.error('Login error!');
      return thunkApi.rejectWithValue(e.message);
    } finally {
      dispatch(stopLoading());
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkApi) => {
    const { dispatch } = thunkApi;
    try {
      dispatch(startLoading());
      await axios.post('/auth/register', credentials);
      const { email, password } = credentials;
      const loginResult = await thunkApi.dispatch(login({ email, password }));

      if (loginResult.error) {
        return thunkApi.rejectWithValue('Login after registration failed');
      }

      toast.success('Registration and login successful!');
      return loginResult.payload;
    } catch (e) {
      if (e.response && e.response.data && e.response.data.errors) {
        toast.error('Registration error!');
        return thunkApi.rejectWithValue(e.response.data.errors);
      }
      toast.error('Server error!');
      return thunkApi.rejectWithValue({ general: 'Server error' });
    } finally {
      dispatch(stopLoading());
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  const { dispatch } = thunkApi;
  try {
    dispatch(startLoading());
    await axios.post('/auth/logout');
    clearAuthHeader();
    toast.success('Logged out successfully!');
  } catch (e) {
    toast.error('Logout error!');
    return thunkApi.rejectWithValue(e.message);
  } finally {
    dispatch(stopLoading());
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(startLoading());
      const response = await axios.post('/auth/refresh');
      const { accessToken, user, userArticles, savedArticles } =
        response.data.data;
      setAuthHeader(accessToken);
      return { accessToken, user, userArticles, savedArticles };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    } finally {
      dispatch(stopLoading());
    }
  }
);

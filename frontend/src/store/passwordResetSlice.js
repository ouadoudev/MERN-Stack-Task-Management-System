import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  error: null,
};

export const requestReset = createAsyncThunk(
  'passwordReset/requestReset',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/password/reset', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const validateReset = createAsyncThunk(
  'passwordReset/validateReset',
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/auth/api/password/reset/verify/${code}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const passwordReset = createAsyncThunk(
  'passwordReset/passwordReset',
  async ({ code, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/auth/api/password/reset/${code}`, { password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestReset.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(requestReset.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(requestReset.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
      })
      .addCase(validateReset.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(validateReset.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(validateReset.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
      })
      .addCase(passwordReset.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(passwordReset.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(passwordReset.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
      });
  },
});

export default passwordResetSlice.reducer;

export const selectResetStatus = (state) => state.passwordReset.status;
export const selectResetError = (state) => state.passwordReset.error;

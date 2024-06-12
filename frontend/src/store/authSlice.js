import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  status: 'idle',
  error: null,
  isAuthenticated: false,
};

export const setUserRole = createAction('auth/setUserRole');


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('/users/register', userData, {
          headers: { "Content-Type": "multipart/form-data" }, 
        });
        localStorage.setItem('user', JSON.stringify(response.data)); 
        return  response.data ;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Unable to register. Please try again later.');
      }
    }
  );
  
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { dispatch, rejectWithValue }) => { 
    try {
      const response = await axios.post('/auth/login', userData, {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem('user', JSON.stringify(response.data)); 
      dispatch(setUserRole(response.data.role)); 
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Unable to login. Please try again later.');
    }
  }
)
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: async (state) => {
      try {
        await axios.post('/users/logout');
        state.user = null;
        state.token = null;
        state.role = null;
        state.status = 'idle';
        state.error = null;
        state.isAuthenticated = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(setUserRole, (state, action) => {
        state.role = action.payload;
      })

      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
export const loggedUser = (state) => state.auth.user;


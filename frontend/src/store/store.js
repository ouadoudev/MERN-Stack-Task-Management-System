import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice'
import taskReducer from './taskSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tasks: taskReducer,
  },
});

export default store;

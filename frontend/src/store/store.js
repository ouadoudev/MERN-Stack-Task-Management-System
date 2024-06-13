import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice'
import taskReducer from './taskSlice';
import passwordResetReducer from './passwordResetSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tasks: taskReducer,
    passwordReset: passwordResetReducer,
  },
});

export default store;

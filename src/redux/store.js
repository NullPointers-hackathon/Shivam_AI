import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import titleReducer from "./slices/titleSlice"


const store = configureStore({
  reducer: {
    auth: authReducer,
    title: titleReducer,
  },
});

export default store;

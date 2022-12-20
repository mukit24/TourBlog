import { configureStore } from '@reduxjs/toolkit';
import { blogDetailsReducer } from '../features/blogDetailsSlice';
import { blogListReducer } from '../features/blogListSlice';
import { userReducer } from '../features/userSlice';

export const store = configureStore({
  reducer: {
    blogList: blogListReducer,
    blogDetails: blogDetailsReducer,
    user: userReducer,
  },
});

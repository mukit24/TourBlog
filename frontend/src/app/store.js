import { configureStore } from '@reduxjs/toolkit';
import { blogDetailsReducer } from '../features/blogDetailsSlice';
import { blogListReducer } from '../features/blogListSlice';

export const store = configureStore({
  reducer: {
    blogList: blogListReducer,
    blogDetails: blogDetailsReducer,
  },
});

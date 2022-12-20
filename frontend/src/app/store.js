import { configureStore } from '@reduxjs/toolkit';
import { blogDetailsReducer } from '../features/blogDetailsSlice';
import { blogListReducer } from '../features/blogListSlice';
import { blogOperationReducer } from '../features/blogOperationSlice';
import { userReducer } from '../features/userSlice';

export const store = configureStore({
  reducer: {
    blogList: blogListReducer,
    blogDetails: blogDetailsReducer,
    blogOperation: blogOperationReducer,
    user: userReducer,
  },
});

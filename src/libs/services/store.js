import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice'; 
import authReducer from './slices/authSlice'; 

export const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
  },
});



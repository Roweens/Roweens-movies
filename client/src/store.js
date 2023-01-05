import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import movieReducer from './features/movie-slice';
import axios from 'axios';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          axios,
        },
      },
      serializableCheck: false,
    }),
});

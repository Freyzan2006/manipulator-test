

import { configureStore } from '@reduxjs/toolkit';
import { manipulatorApi } from './services/manipulatorApi'; 
import manipulatorReducer from './slice/manipulatorSlice';
import successSnackbarReducer from "./slice/SuccessSnackbarSlice"
import authReducer from "./slice/authSlice"

export const store = configureStore({
  reducer: {
    manipulator: manipulatorReducer, 
    successSnackbar: successSnackbarReducer,
    auth: authReducer,
    [manipulatorApi.reducerPath]: manipulatorApi.reducer, // Добавьте редьюсер для manipulatorApi
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(manipulatorApi.middleware), // Добавьте middleware для RTK Query
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import expensesSlice from './expensesSlice';
import ToastMiddleware from '../middlewares/ToastMiddleware';
import authenticationSlice from './authenticationSlice';

const middlewares = [
  ToastMiddleware,
];

export default configureStore({
  reducer: {
    authenticationSlice: authenticationSlice,
    expensesSlice: expensesSlice
  },
  middleware: middlewares,
});

import { configureStore } from '@reduxjs/toolkit';
import expensesSlice from './expensesSlice';
import ToastMiddleware from '../middlewares/ToastMiddleware';
import authenticationSlice from './authenticationSlice';
import statisticsSlice from './statisticsSlice';

const middlewares = [
  ToastMiddleware,
];

export default configureStore({
  reducer: {
    authenticationSlice: authenticationSlice,
    expensesSlice: expensesSlice,
    statisticsSlice: statisticsSlice
  },
  middleware: middlewares,
});

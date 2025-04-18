import { configureStore } from '@reduxjs/toolkit';
import tradingPairsReducer from './features/tradingPairsSlice';
import ordersReducer from './features/ordersSlice';
import tradesReducer from './features/tradesSlice';
import orderBookReducer from './features/orderBookSlice';
import tradingReducer from './slices/tradingSlice';
import { api } from './api';

export const store = configureStore({
  reducer: {
    tradingPairs: tradingPairsReducer,
    orders: ordersReducer,
    trades: tradesReducer,
    orderBook: orderBookReducer,
    trading: tradingReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
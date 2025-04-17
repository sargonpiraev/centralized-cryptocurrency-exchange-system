import { configureStore } from '@reduxjs/toolkit';
import tradingPairsReducer from './features/tradingPairsSlice';
import ordersReducer from './features/ordersSlice';
import tradesReducer from './features/tradesSlice';
import orderBookReducer from './features/orderBookSlice';

export const store = configureStore({
  reducer: {
    tradingPairs: tradingPairsReducer,
    orders: ordersReducer,
    trades: tradesReducer,
    orderBook: orderBookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderBook, OrderBookEntry } from '../../types';

const generateMockOrderBookEntries = (count: number, basePrice: number, isBid: boolean): OrderBookEntry[] => {
  return Array.from({ length: count }, (_, i) => {
    const price = basePrice + (isBid ? -i * 10 : i * 10);
    const amount = Math.random() * 2;
    return {
      price,
      amount,
      total: price * amount,
    };
  });
};

const mockOrderBook: OrderBook = {
  bids: generateMockOrderBookEntries(20, 50000, true),
  asks: generateMockOrderBookEntries(20, 50000, false),
};

interface OrderBookState {
  orderBook: OrderBook;
}

const initialState: OrderBookState = {
  orderBook: mockOrderBook,
};

const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState,
  reducers: {
    updateOrderBook: (state, action: PayloadAction<OrderBook>) => {
      state.orderBook = action.payload;
    },
    updateBids: (state, action: PayloadAction<OrderBookEntry[]>) => {
      state.orderBook.bids = action.payload;
    },
    updateAsks: (state, action: PayloadAction<OrderBookEntry[]>) => {
      state.orderBook.asks = action.payload;
    },
  },
});

export const { updateOrderBook, updateBids, updateAsks } = orderBookSlice.actions;
export default orderBookSlice.reducer; 
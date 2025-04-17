import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trade } from '../../types';

const mockTrades: Trade[] = [
  {
    id: '1',
    pair: 'BTC/USDT',
    price: 50000,
    amount: 0.1,
    side: 'buy',
    timestamp: Date.now() - 1800000,
  },
  {
    id: '2',
    pair: 'ETH/USDT',
    price: 3000,
    amount: 2,
    side: 'sell',
    timestamp: Date.now() - 3600000,
  },
  {
    id: '3',
    pair: 'BTC/USDT',
    price: 49900,
    amount: 0.05,
    side: 'sell',
    timestamp: Date.now() - 5400000,
  },
];

interface TradesState {
  trades: Trade[];
}

const initialState: TradesState = {
  trades: mockTrades,
};

const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {
    addTrade: (state, action: PayloadAction<Trade>) => {
      state.trades.unshift(action.payload);
    },
  },
});

export const { addTrade } = tradesSlice.actions;
export default tradesSlice.reducer; 
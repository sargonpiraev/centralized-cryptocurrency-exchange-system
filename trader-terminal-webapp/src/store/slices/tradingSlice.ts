import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TradingState {
  currentSymbol: string;
}

const initialState: TradingState = {
  currentSymbol: 'BTC/USDT',
};

const tradingSlice = createSlice({
  name: 'trading',
  initialState,
  reducers: {
    setCurrentSymbol: (state, action: PayloadAction<string>) => {
      state.currentSymbol = action.payload;
    },
  },
});

export const { setCurrentSymbol } = tradingSlice.actions;

export const selectCurrentSymbol = (state: { trading: TradingState }) => state.trading.currentSymbol;

export default tradingSlice.reducer; 
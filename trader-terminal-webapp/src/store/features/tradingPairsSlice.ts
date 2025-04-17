import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TradingPair } from '../../types';

const mockTradingPairs: TradingPair[] = [
  { id: '1', symbol: 'BTC/USDT', baseAsset: 'BTC', quoteAsset: 'USDT', price: 50000, change24h: 2.5 },
  { id: '2', symbol: 'ETH/USDT', baseAsset: 'ETH', quoteAsset: 'USDT', price: 3000, change24h: -1.2 },
  { id: '3', symbol: 'BNB/USDT', baseAsset: 'BNB', quoteAsset: 'USDT', price: 400, change24h: 0.8 },
  { id: '4', symbol: 'SOL/USDT', baseAsset: 'SOL', quoteAsset: 'USDT', price: 100, change24h: 5.2 },
  { id: '5', symbol: 'ADA/USDT', baseAsset: 'ADA', quoteAsset: 'USDT', price: 0.5, change24h: -2.1 },
  { id: '6', symbol: 'XRP/USDT', baseAsset: 'XRP', quoteAsset: 'USDT', price: 0.6, change24h: 1.3 },
  { id: '7', symbol: 'DOT/USDT', baseAsset: 'DOT', quoteAsset: 'USDT', price: 7, change24h: -0.5 },
  { id: '8', symbol: 'DOGE/USDT', baseAsset: 'DOGE', quoteAsset: 'USDT', price: 0.1, change24h: 3.2 },
  { id: '9', symbol: 'AVAX/USDT', baseAsset: 'AVAX', quoteAsset: 'USDT', price: 20, change24h: -1.8 },
  { id: '10', symbol: 'MATIC/USDT', baseAsset: 'MATIC', quoteAsset: 'USDT', price: 1.5, change24h: 0.9 },
  { id: '11', symbol: 'LINK/USDT', baseAsset: 'LINK', quoteAsset: 'USDT', price: 15, change24h: -0.7 },
  { id: '12', symbol: 'UNI/USDT', baseAsset: 'UNI', quoteAsset: 'USDT', price: 8, change24h: 1.1 },
  { id: '13', symbol: 'AAVE/USDT', baseAsset: 'AAVE', quoteAsset: 'USDT', price: 90, change24h: -2.3 },
  { id: '14', symbol: 'ATOM/USDT', baseAsset: 'ATOM', quoteAsset: 'USDT', price: 12, change24h: 0.4 },
  { id: '15', symbol: 'LTC/USDT', baseAsset: 'LTC', quoteAsset: 'USDT', price: 70, change24h: -1.5 },
];

interface TradingPairsState {
  pairs: TradingPair[];
  selectedPair: string | null;
}

const initialState: TradingPairsState = {
  pairs: mockTradingPairs,
  selectedPair: 'BTC/USDT',
};

const tradingPairsSlice = createSlice({
  name: 'tradingPairs',
  initialState,
  reducers: {
    setSelectedPair: (state, action: PayloadAction<string>) => {
      state.selectedPair = action.payload;
    },
    updatePairPrice: (state, action: PayloadAction<{ symbol: string; price: number }>) => {
      const pair = state.pairs.find(p => p.symbol === action.payload.symbol);
      if (pair) {
        pair.price = action.payload.price;
      }
    },
  },
});

export const { setSelectedPair, updatePairPrice } = tradingPairsSlice.actions;
export default tradingPairsSlice.reducer; 
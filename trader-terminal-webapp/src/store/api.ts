import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CandleData, OrderBook, Order, Trade } from './types';

const API_BASE_URL = 'http://localhost:3000/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    // Get candlestick data
    getCandles: builder.query<CandleData[], {
      symbol: string;
      timeframe: string;
      startTime?: number;
      endTime?: number;
    }>({
      query: ({ symbol, timeframe, startTime, endTime }) => ({
        url: '/candles',
        params: { symbol, timeframe, startTime, endTime },
      }),
    }),

    // Get current order book
    getOrderBook: builder.query<OrderBook, {
      symbol: string;
      limit?: number;
    }>({
      query: ({ symbol, limit }) => ({
        url: '/orderbook',
        params: { symbol, limit },
      }),
    }),

    // Get open orders
    getOpenOrders: builder.query<Order[], {
      symbol?: string;
    }>({
      query: ({ symbol } = {}) => ({
        url: '/orders/open',
        params: { symbol },
      }),
    }),

    // Get order history
    getOrderHistory: builder.query<Order[], {
      symbol?: string;
      startTime?: number;
      endTime?: number;
    }>({
      query: ({ symbol, startTime, endTime } = {}) => ({
        url: '/orders/history',
        params: { symbol, startTime, endTime },
      }),
    }),

    // Get trade history
    getTradeHistory: builder.query<Trade[], {
      symbol?: string;
      startTime?: number;
      endTime?: number;
    }>({
      query: ({ symbol, startTime, endTime } = {}) => ({
        url: '/trades/history',
        params: { symbol, startTime, endTime },
      }),
    }),
  }),
});

export const {
  useGetCandlesQuery,
  useGetOrderBookQuery,
  useGetOpenOrdersQuery,
  useGetOrderHistoryQuery,
  useGetTradeHistoryQuery,
} = api; 
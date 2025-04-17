import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types';

const mockOrders: Order[] = [
  {
    id: '1',
    pair: 'BTC/USDT',
    type: 'limit',
    side: 'buy',
    price: 49000,
    amount: 0.1,
    total: 4900,
    status: 'open',
    timestamp: Date.now() - 3600000,
  },
  {
    id: '2',
    pair: 'ETH/USDT',
    type: 'market',
    side: 'sell',
    price: 3000,
    amount: 1,
    total: 3000,
    status: 'filled',
    timestamp: Date.now() - 7200000,
  },
];

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: mockOrders,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
      const order = state.orders.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
    cancelOrder: (state, action: PayloadAction<string>) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) {
        order.status = 'cancelled';
      }
    },
  },
});

export const { addOrder, updateOrderStatus, cancelOrder } = ordersSlice.actions;
export default ordersSlice.reducer; 
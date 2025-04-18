import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useGetOrderBookQuery } from '../store/api';
import { useAppSelector } from '../store/hooks';
import { selectCurrentSymbol } from '../store/slices/tradingSlice';
import OrderBook from './OrderBook';

const OrderBookContainer: React.FC = () => {
  const currentSymbol = useAppSelector(selectCurrentSymbol);

  const { data: orderBook, isLoading, error } = useGetOrderBookQuery({
    symbol: currentSymbol,
  });

  if (isLoading) {
    return (
      <Box sx={{ 
        width: '100%', 
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        width: '100%', 
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'error.main',
      }}>
        Error loading order book data
      </Box>
    );
  }

  if (!orderBook) {
    return null;
  }

  return <OrderBook orderBook={orderBook} />;
};

export default OrderBookContainer; 
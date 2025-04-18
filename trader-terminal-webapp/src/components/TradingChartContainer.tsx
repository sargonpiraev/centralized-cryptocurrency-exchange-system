import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useGetCandlesQuery } from '../store/api';
import { useAppSelector } from '../store/hooks';
import { selectCurrentSymbol } from '../store/slices/tradingSlice';
import TradingChart from './TradingChart';
import { CandlestickData } from 'lightweight-charts';

const TradingChartContainer: React.FC = () => {
  const currentSymbol = useAppSelector(selectCurrentSymbol);

  const { data: candles, isLoading, error } = useGetCandlesQuery({
    symbol: currentSymbol,
    timeframe: '1m',
  });

  const formattedData: CandlestickData[] = React.useMemo(() => {
    if (!candles) return [];
    return candles.map((candle) => ({
      time: (candle.timestamp / 1000) as unknown as string,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }));
  }, [candles]);

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
        Error loading chart data
      </Box>
    );
  }

  return <TradingChart data={formattedData} />;
};

export default TradingChartContainer; 
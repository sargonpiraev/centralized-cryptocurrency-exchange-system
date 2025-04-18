import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts';
import { Box, CircularProgress } from '@mui/material';
import { useGetCandlesQuery } from '../store/api';
import { useAppSelector } from '../store/hooks';
import { selectCurrentSymbol } from '../store/slices/tradingSlice';
import { RootState } from '../store';

const TradingChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const currentSymbol = useAppSelector(selectCurrentSymbol);

  const { data: candles, isLoading, error } = useGetCandlesQuery({
    symbol: currentSymbol,
    timeframe: '1m',
  });

  useEffect(() => {
    if (!chartContainerRef.current) return;

    try {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        layout: {
          background: { color: '#1e222d' },
          textColor: '#d9d9d9',
        },
        grid: {
          vertLines: { color: '#2B2B43' },
          horzLines: { color: '#2B2B43' },
        },
      });

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });

      seriesRef.current = candlestickSeries;
      chartRef.current = chart;

      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    } catch (error) {
      console.error('Error initializing chart:', error);
    }
  }, []);

  useEffect(() => {
    if (seriesRef.current && candles && candles.length > 0) {
      try {
        const formattedData: CandlestickData[] = candles.map((candle) => ({
          time: (candle.timestamp / 1000) as unknown as string,
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
        }));
        seriesRef.current.setData(formattedData);
      } catch (error) {
        console.error('Error setting chart data:', error);
      }
    }
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

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      position: 'relative'
    }}>
      <Box 
        ref={chartContainerRef} 
        sx={{ 
          width: '100%', 
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }} 
      />
    </Box>
  );
};

export default TradingChart; 
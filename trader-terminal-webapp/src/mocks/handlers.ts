import { http, HttpResponse } from 'msw';
import { mockCandlesByPair } from '../mockData';

export const handlers = [
  http.get('http://localhost:3000/api/candles', ({ request }) => {
    const url = new URL(request.url);
    const symbol = url.searchParams.get('symbol');
    const timeframe = url.searchParams.get('timeframe');
    const startTime = url.searchParams.get('startTime');
    const endTime = url.searchParams.get('endTime');

    if (!symbol || !timeframe) {
      return HttpResponse.json(
        { error: 'Symbol and timeframe are required' },
        { status: 400 }
      );
    }

    const candles = mockCandlesByPair[symbol];
    
    if (!candles) {
      return HttpResponse.json(
        { error: 'Symbol not found' },
        { status: 404 }
      );
    }

    let filteredCandles = [...candles];

    if (startTime) {
      filteredCandles = filteredCandles.filter(
        candle => candle.timestamp >= Number(startTime)
      );
    }

    if (endTime) {
      filteredCandles = filteredCandles.filter(
        candle => candle.timestamp <= Number(endTime)
      );
    }

    return HttpResponse.json(filteredCandles);
  }),
]; 
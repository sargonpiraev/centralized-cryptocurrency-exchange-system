import { http, HttpResponse, ws } from 'msw';
import { mockCandlesByPair, mockOrderBooks } from './mockData';
import { setupServer } from 'msw/node';

// Create a WebSocket link for candle updates
const candleWs = ws.link('ws://localhost:3000/ws/candles');

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

  http.get('http://localhost:3000/api/orderbook', ({ request }) => {
    const url = new URL(request.url);
    const symbol = url.searchParams.get('symbol');

    if (!symbol) {
      return HttpResponse.json(
        { error: 'Symbol is required' },
        { status: 400 }
      );
    }

    const orderBook = mockOrderBooks[symbol];
    
    if (!orderBook) {
      return HttpResponse.json(
        { error: 'Symbol not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(orderBook);
  }),

  // WebSocket handler for real-time candle updates
  candleWs.addEventListener('connection', ({ client }) => {

    const url = new URL(client.url);
    const symbol = url.searchParams.get('symbol');
    const timeframe = url.searchParams.get('timeframe');

    if (!symbol || !timeframe) {
      client.close(1008, 'Symbol and timeframe are required');
      return;
    }


    const candles = mockCandlesByPair[symbol];
    if (!candles) {
      client.close(1008, 'Symbol not found');
      return;
    }


    // Send initial data
    client.send(JSON.stringify(candles[candles.length - 1]));

    // Set up interval for sending updates
    const interval = setInterval(() => {
      const lastCandle = candles[candles.length - 1];
      const newCandle = {
        ...lastCandle,
        timestamp: lastCandle.timestamp + 1000, // Add 1 minute
        open: lastCandle.close,
        high: lastCandle.close * (1 + Math.random() * 0.001), // Random change up to 0.1%
        low: lastCandle.close * (1 - Math.random() * 0.001),  // Random change up to 0.1%
        close: lastCandle.close * (1 + (Math.random() - 0.5) * 0.002), // Random change between -0.2% and +0.2%
        volume: lastCandle.volume * (1 + Math.random() * 0.01),
      };
      client.send(JSON.stringify(newCandle));
    }, 1000); // Send updates every second

    // Cleanup on connection close
    client.addEventListener('close', () => {
      clearInterval(interval);
    });
  }),
]; 
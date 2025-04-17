import { Candle, Order, Trade, OrderBook, OrderBookEntry, TradingPair } from './types'

export const tradingPairs: TradingPair[] = [
  {
    id: '1',
    symbol: 'BTC/USDT',
    baseAsset: 'BTC',
    quoteAsset: 'USDT',
    price: 50000,
    change24h: 2.5,
  },
  {
    id: '2',
    symbol: 'ETH/USDT',
    baseAsset: 'ETH',
    quoteAsset: 'USDT',
    price: 3000,
    change24h: -1.2,
  },
  {
    id: '3',
    symbol: 'SOL/USDT',
    baseAsset: 'SOL',
    quoteAsset: 'USDT',
    price: 100,
    change24h: 5.7,
  },
];

const generateCandles = (basePrice: number, volatility: number): Candle[] => {
  return Array.from({ length: 100 }, (_, i) => {
    const timestamp = Date.now() - (100 - i) * 60000 // 1 minute intervals
    const open = basePrice + (Math.random() * volatility * 2 - volatility)
    const high = open + Math.random() * volatility
    const low = open - Math.random() * volatility
    const close = low + Math.random() * (high - low)
    const volume = Math.random() * 10

    return {
      timestamp,
      open,
      high,
      low,
      close,
      volume,
    }
  })
}

export const mockCandlesByPair: Record<string, Candle[]> = {
  'BTC/USDT': generateCandles(50000, 100),
  'ETH/USDT': generateCandles(3000, 50),
  'SOL/USDT': generateCandles(100, 5),
}

const generateOrderBookEntry = (basePrice: number, isBid: boolean, volatility: number): OrderBookEntry => {
  const price = basePrice + (isBid ? -1 : 1) * Math.random() * volatility
  const amount = Math.random() * 10
  return {
    price,
    amount,
    total: price * amount,
  }
}

export const mockOrderBookByPair: Record<string, OrderBook> = {
  'BTC/USDT': {
    bids: Array.from({ length: 20 }, () => generateOrderBookEntry(50000, true, 100))
      .sort((a, b) => b.price - a.price),
    asks: Array.from({ length: 20 }, () => generateOrderBookEntry(50000, false, 100))
      .sort((a, b) => a.price - b.price),
  },
  'ETH/USDT': {
    bids: Array.from({ length: 20 }, () => generateOrderBookEntry(3000, true, 50))
      .sort((a, b) => b.price - a.price),
    asks: Array.from({ length: 20 }, () => generateOrderBookEntry(3000, false, 50))
      .sort((a, b) => a.price - b.price),
  },
  'SOL/USDT': {
    bids: Array.from({ length: 20 }, () => generateOrderBookEntry(100, true, 5))
      .sort((a, b) => b.price - a.price),
    asks: Array.from({ length: 20 }, () => generateOrderBookEntry(100, false, 5))
      .sort((a, b) => a.price - b.price),
  },
}

const generateOrders = (pair: string, basePrice: number): Order[] => {
  return Array.from({ length: 50 }, (_, i) => {
    const timestamp = Date.now() - i * 60000
    const price = basePrice + Math.random() * 100 - 50
    const amount = Math.random() * 10
    const status = i < 10 ? 'open' : (i < 30 ? 'filled' : 'cancelled')

    return {
      id: `order-${pair}-${i}`,
      pair,
      type: Math.random() > 0.5 ? 'limit' : 'market',
      side: Math.random() > 0.5 ? 'buy' : 'sell',
      price,
      amount,
      total: price * amount,
      status,
      timestamp,
    }
  })
}

export const mockOrdersByPair: Record<string, Order[]> = {
  'BTC/USDT': generateOrders('BTC/USDT', 50000),
  'ETH/USDT': generateOrders('ETH/USDT', 3000),
  'SOL/USDT': generateOrders('SOL/USDT', 100),
}

const generateTrades = (pair: string, basePrice: number): Trade[] => {
  return Array.from({ length: 30 }, (_, i) => {
    const timestamp = Date.now() - i * 60000
    const price = basePrice + Math.random() * 100 - 50
    const amount = Math.random() * 10

    return {
      id: `trade-${pair}-${i}`,
      pair,
      price,
      amount,
      side: Math.random() > 0.5 ? 'buy' : 'sell',
      timestamp,
    }
  })
}

export const mockTradesByPair: Record<string, Trade[]> = {
  'BTC/USDT': generateTrades('BTC/USDT', 50000),
  'ETH/USDT': generateTrades('ETH/USDT', 3000),
  'SOL/USDT': generateTrades('SOL/USDT', 100),
} 
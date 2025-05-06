import { Injectable } from '@nestjs/common';
import { CandleData, OrderBook, Order, Trade } from './types';

@Injectable()
export class AppService {
  private generateMockCandles(symbol: string, timeframe: string, count: number = 100): CandleData[] {
    const candles: CandleData[] = [];
    const now = Date.now();
    const timeframeMs = this.getTimeframeMs(timeframe);
    
    for (let i = 0; i < count; i++) {
      const basePrice = 50000 + Math.random() * 1000;
      const open = basePrice;
      const high = basePrice + Math.random() * 100;
      const low = basePrice - Math.random() * 100;
      const close = low + Math.random() * (high - low);
      
      candles.push({
        timestamp: now - (count - i) * timeframeMs,
        open,
        high,
        low,
        close,
        volume: Math.random() * 10,
      });
    }
    
    return candles;
  }

  private getTimeframeMs(timeframe: string): number {
    const unit = timeframe.slice(-1);
    const value = parseInt(timeframe.slice(0, -1));
    
    switch (unit) {
      case 'm': return value * 60 * 1000;
      case 'h': return value * 60 * 60 * 1000;
      case 'd': return value * 24 * 60 * 60 * 1000;
      default: return 60 * 1000;
    }
  }

  getCandles(symbol: string, timeframe: string, startTime?: number, endTime?: number): CandleData[] {
    return this.generateMockCandles(symbol, timeframe);
  }

  getOrderBook(symbol: string, limit: number = 20): OrderBook {
    const bids: [number, number][] = [];
    const asks: [number, number][] = [];
    const basePrice = 50000;
    
    for (let i = 0; i < limit; i++) {
      const bidPrice = basePrice - (i * 10) - Math.random() * 5;
      const askPrice = basePrice + (i * 10) + Math.random() * 5;
      
      bids.push([bidPrice, Math.random() * 2]);
      asks.push([askPrice, Math.random() * 2]);
    }
    
    return { bids, asks };
  }

  getOpenOrders(symbol?: string): Order[] {
    const orders: Order[] = [];
    const symbols = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'];
    const selectedSymbols = symbol ? [symbol] : symbols;
    
    for (const sym of selectedSymbols) {
      for (let i = 0; i < 5; i++) {
        const side = Math.random() > 0.5 ? 'buy' : 'sell';
        const price = 50000 + (Math.random() - 0.5) * 1000;
        
        orders.push({
          id: `order-${Date.now()}-${i}`,
          symbol: sym,
          side,
          type: 'limit',
          price,
          quantity: Math.random() * 2,
          status: 'open',
          timestamp: Date.now() - Math.random() * 3600000,
        });
      }
    }
    
    return orders;
  }

  getOrderHistory(symbol?: string, startTime?: number, endTime?: number): Order[] {
    const orders: Order[] = [];
    const symbols = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'];
    const selectedSymbols = symbol ? [symbol] : symbols;
    
    for (const sym of selectedSymbols) {
      for (let i = 0; i < 20; i++) {
        const side = Math.random() > 0.5 ? 'buy' : 'sell';
        const price = 50000 + (Math.random() - 0.5) * 1000;
        const status = Math.random() > 0.3 ? 'filled' : 'canceled';
        
        orders.push({
          id: `order-${Date.now()}-${i}`,
          symbol: sym,
          side,
          type: 'limit',
          price,
          quantity: Math.random() * 2,
          status,
          timestamp: Date.now() - Math.random() * 86400000,
        });
      }
    }
    
    return orders;
  }

  getTradeHistory(symbol?: string, startTime?: number, endTime?: number): Trade[] {
    const trades: Trade[] = [];
    const symbols = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'];
    const selectedSymbols = symbol ? [symbol] : symbols;
    
    for (const sym of selectedSymbols) {
      for (let i = 0; i < 30; i++) {
        const side = Math.random() > 0.5 ? 'buy' : 'sell';
        const price = 50000 + (Math.random() - 0.5) * 1000;
        
        trades.push({
          id: `trade-${Date.now()}-${i}`,
          symbol: sym,
          price,
          quantity: Math.random() * 2,
          side,
          timestamp: Date.now() - Math.random() * 86400000,
        });
      }
    }
    
    return trades;
  }
}

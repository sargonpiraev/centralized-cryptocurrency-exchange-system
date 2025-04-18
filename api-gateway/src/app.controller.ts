import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CandleData, OrderBook, Order, Trade } from './types';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('candles')
  getCandles(
    @Query('symbol') symbol: string,
    @Query('timeframe') timeframe: string,
    @Query('startTime') startTime?: number,
    @Query('endTime') endTime?: number,
  ): CandleData[] {
    return this.appService.getCandles(symbol, timeframe, startTime, endTime);
  }

  @Get('orderbook')
  getOrderBook(
    @Query('symbol') symbol: string,
    @Query('limit') limit?: number,
  ): OrderBook {
    return this.appService.getOrderBook(symbol, limit);
  }

  @Get('orders/open')
  getOpenOrders(@Query('symbol') symbol?: string): Order[] {
    return this.appService.getOpenOrders(symbol);
  }

  @Get('orders/history')
  getOrderHistory(
    @Query('symbol') symbol?: string,
    @Query('startTime') startTime?: number,
    @Query('endTime') endTime?: number,
  ): Order[] {
    return this.appService.getOrderHistory(symbol, startTime, endTime);
  }

  @Get('trades/history')
  getTradeHistory(
    @Query('symbol') symbol?: string,
    @Query('startTime') startTime?: number,
    @Query('endTime') endTime?: number,
  ): Trade[] {
    return this.appService.getTradeHistory(symbol, startTime, endTime);
  }
}

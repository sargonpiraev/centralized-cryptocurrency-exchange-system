import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { kafkaClientModule } from './module/kafka.client';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    kafkaClientModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}

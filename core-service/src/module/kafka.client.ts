import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';


export const kafkaClientModule = ClientsModule.registerAsync([
  {
    name: 'KAFKA_CLIENT',
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'core-service',
          brokers: [configService.get('KAFKA_BROKER') || 'localhost:9092'],
        },
        consumer: {
          groupId: 'core-service-consumer',
        },
      },
    }),
    inject: [ConfigService],
  },
]); 
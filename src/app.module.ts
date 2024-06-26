import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionFilter } from './filter/exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { MessageModule } from './app/message/message.module';
import { TicketModule } from './app/ticket/ticket.module';
import { EventModule } from './app/event/event.module';
import { CategoryModule } from './app/category/category.module';
import { AuthModule } from './app/auth/auth.module';
import { TimezoneModule } from './app/timezone/timezone.module';
import { UploaderModule } from './app/uploader/uploader.module';
import { EventTransactionModule } from './app/event-transaction/event-transaction.module';
import { EventTransactionDetailModule } from './app/event-transaction-detail/event-transaction-detail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
          },
        }),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    MessageModule,
    TicketModule,
    EventModule,
    CategoryModule,
    AuthModule,
    TimezoneModule,
    UploaderModule,
    EventTransactionModule,
    EventTransactionDetailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { EventTransactionService } from './event-transaction.service';
import { EventTransactionController } from './event-transaction.controller';

@Module({
  controllers: [EventTransactionController],
  providers: [EventTransactionService],
})
export class EventTransactionModule {}

import { Module } from '@nestjs/common';
import { EventTransactionDetailService } from './event-transaction-detail.service';
import { EventTransactionDetailController } from './event-transaction-detail.controller';

@Module({
  controllers: [EventTransactionDetailController],
  providers: [EventTransactionDetailService],
})
export class EventTransactionDetailModule {}

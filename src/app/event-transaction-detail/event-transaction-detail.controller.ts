import { Controller } from '@nestjs/common';
import { EventTransactionDetailService } from './event-transaction-detail.service';

@Controller('event-transaction-detail')
export class EventTransactionDetailController {
  constructor(private readonly eventTransactionDetailService: EventTransactionDetailService) {}
}

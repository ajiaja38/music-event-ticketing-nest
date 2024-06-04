import { Controller } from '@nestjs/common';
import { EventTransactionService } from './event-transaction.service';

@Controller('event-transaction')
export class EventTransactionController {
  constructor(private readonly eventTransactionService: EventTransactionService) {}
}

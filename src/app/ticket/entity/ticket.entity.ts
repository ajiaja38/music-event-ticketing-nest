import { Category } from 'src/app/category/entity/category.entity';
import { EventTrxDetail } from 'src/app/event-transaction-detail/entity/eventTrxDetail.entity';
import { ETransactionStatus } from 'src/utils/enum/ETransaction.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'mst_tickets',
})
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  code: string;

  @Column({
    type: 'enum',
    enum: ETransactionStatus,
    enumName: 'ETransactionStatus',
    default: ETransactionStatus.UNPAID,
  })
  status: ETransactionStatus;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.tickets)
  category: Category;

  @ManyToOne(() => EventTrxDetail, (eventTrxDetail) => eventTrxDetail.tickets)
  eventTrxDetail: EventTrxDetail;
}

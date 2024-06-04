import { EventTrx } from 'src/app/event-transaction/entity/eventTrx.entity';
import { Ticket } from 'src/app/ticket/entity/ticket.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'event-trx-detail',
})
export class EventTrxDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'integer',
  })
  quantity: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.eventTrxDetail, {
    onDelete: 'CASCADE',
  })
  tickets: Ticket[];

  @ManyToOne(() => EventTrx, (eventTrx) => eventTrx.eventTrxs)
  eventTrx: EventTrx;
}

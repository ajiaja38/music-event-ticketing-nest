import { EventTrxDetail } from 'src/app/event-transaction-detail/entity/eventTrxDetail.entity';
import { User } from 'src/app/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'event_trx',
})
export class EventTrx {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'integer',
  })
  totalPrice: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(
    () => EventTrxDetail,
    (eventTrxDetail) => eventTrxDetail.eventTrx,
    {
      onDelete: 'CASCADE',
    },
  )
  eventTrxs: EventTrxDetail[];

  @ManyToOne(() => User, (user) => user.eventTrxs)
  user: User;
}

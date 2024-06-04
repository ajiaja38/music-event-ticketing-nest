import { Event } from 'src/app/event/entity/event.entity';
import { Ticket } from 'src/app/ticket/entity/ticket.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'mst_category',
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quota: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => Event, (event) => event.categories)
  event: Event;

  @OneToMany(() => Ticket, (ticket) => ticket.category)
  tickets: Ticket[];
}

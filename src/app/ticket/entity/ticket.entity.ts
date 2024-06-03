import { User } from 'src/app/user/entity/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({
  name: 'trx_tickets',
})
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  code: string;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  @BeforeInsert()
  addPrefixToId() {
    this.id = `ticket-${uuidv4()}`;
  }
}

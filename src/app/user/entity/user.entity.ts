import { Ticket } from 'src/app/ticket/entity/ticket.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({
  name: 'mst_user',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @BeforeInsert()
  addPrefixToId() {
    this.id = `user-${uuidv4()}`;
  }
}

import { User } from 'src/app/user/entity/user.entity';
import { ETransactionStatus } from 'src/utils/enum/ETransaction.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({
    type: 'enum',
    enum: ETransactionStatus,
    enumName: 'ETransactionStatus',
  })
  status: ETransactionStatus;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tickets, { onDelete: 'CASCADE' })
  user: User;
}

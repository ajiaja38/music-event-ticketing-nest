import { EventTrx } from 'src/app/event-transaction/entity/eventTrx.entity';
import { ERole } from 'src/utils/enum/ERole.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'mst_user',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    enum: ERole,
  })
  role: ERole;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => EventTrx, (eventTrx) => eventTrx.user)
  eventTrxs: EventTrx[];
}

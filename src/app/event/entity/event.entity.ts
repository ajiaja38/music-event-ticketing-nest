import { Category } from 'src/app/category/entity/category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'mst_event',
})
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  name: string;

  @Column({
    nullable: false,
    type: Date,
  })
  time: Date;

  @Column({
    nullable: false,
  })
  place: string;

  @Column({
    type: 'varchar',
  })
  banner: string;

  @Column({
    type: 'date',
  })
  createdAt: Date;

  @Column({
    type: 'date',
  })
  updatedAt: Date;

  @OneToMany(() => Category, (category) => category.event, {
    cascade: true,
  })
  categories: Category[];
}

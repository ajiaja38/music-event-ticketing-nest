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
  })
  name: string;

  @Column({
    nullable: false,
  })
  time: Date;

  @Column({
    nullable: false,
  })
  place: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => Category, (category) => category.event, {
    cascade: true,
  })
  categories: Category[];
}

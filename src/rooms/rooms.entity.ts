import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  slots: number;

  @Column('float')
  price: number;

  @Column('float')
  pool: number;

  @Column()
  isVisible: boolean;

  @Column()
  isSoon: boolean;
}

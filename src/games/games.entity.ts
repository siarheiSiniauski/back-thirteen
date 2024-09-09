import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Rounds } from 'src/rounds/rounds.entity';

export type GameStatus = 'RECRUITMENT' | 'PASSES' | 'FINISHED';

export interface IPlayer {
  telegramId: number;
  avatar: string | null;
}

@Entity()
export class Games {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  roomId: string;

  @Column('int')
  slots: number;

  @Column({
    type: 'enum',
    enum: ['RECRUITMENT', 'PASSES', 'FINISHED'],
    default: 'RECRUITMENT',
  })
  status: GameStatus;

  @Column({
    type: 'json',
    default: () => "'[]'",
  })
  players: IPlayer[];

  @OneToMany(() => Rounds, (round) => round.game)
  rounds: Rounds[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date | null;
}

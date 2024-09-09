import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Participants } from '../participants/participants.entity';
import { Games } from '../games/games.entity';

export type RoundStatus =
  | 'RECRUITMENT'
  | 'WAITING'
  | 'READY'
  | 'GAME'
  | 'GAME_OVER';

@Entity()
export class Rounds {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  gameId: string;

  @Column('uuid', { nullable: true })
  nextRound: string;

  @Column({
    type: 'enum',
    enum: ['RECRUITMENT', 'WAITING', 'READY', 'GAME', 'GAME_OVER'],
    default: 'RECRUITMENT',
  })
  status: RoundStatus;

  @ManyToOne(() => Games, (game) => game.rounds, { onDelete: 'CASCADE' })
  game: Games;

  @OneToMany(() => Participants, (participant) => participant.round)
  participants: Participants[];
}

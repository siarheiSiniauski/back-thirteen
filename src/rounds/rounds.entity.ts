import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Participants } from '../participants/participants.entity';
import { Games } from '../games/games.entity';

@Entity()
export class Rounds {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  gameId: string;

  @ManyToOne(() => Games, (game) => game.rounds, { onDelete: 'CASCADE' })
  game: Games;

  @OneToMany(() => Participants, (participant) => participant.round)
  participants: Participants[];
}

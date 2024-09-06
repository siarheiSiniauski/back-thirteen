import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Rounds } from '../rounds/rounds.entity';

@Entity()
export class Participants {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('bigint')
  telegramId: number;

  @Column('int')
  position: number;

  @Column('varchar')
  name: string | null;

  @Column('varchar', { nullable: true })
  avatar: string;

  @Column('boolean', { default: false })
  isChamber: boolean;

  @Column('boolean', { default: false })
  isShoot: boolean;

  @Column('boolean', { default: false })
  isReady: boolean;

  @Column('timestamp', { nullable: true })
  shoot: Date | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Rounds, (round) => round.participants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'roundId' })
  round: Rounds;
}

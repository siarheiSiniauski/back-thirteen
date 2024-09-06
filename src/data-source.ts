import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Games } from './games/games.entity';
import { Participants } from './participants/participants.entity';
import { Rounds } from './rounds/rounds.entity';
import { Rooms } from './rooms/rooms.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Rooms, Games, Rounds, Participants],
  migrations: ['src/migrations/*.ts'],
  synchronize: Boolean(process.env.DATABASE_SYNC), // Убедитесь, что synchronize выключен в продакшене
});

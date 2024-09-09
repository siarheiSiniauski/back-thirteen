import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { parse } from 'pg-connection-string';

import { Games } from './games/games.entity';
import { Participants } from './participants/participants.entity';
import { Rounds } from './rounds/rounds.entity';
import { Rooms } from './rooms/rooms.entity';

dotenv.config();

const synchronize = process.env.DATABASE_SYNC
  ? JSON.parse(process.env.DATABASE_SYNC)
  : false;
const rejectUnauthorized = process.env.SSL_REJECT_UNAUTHORIZED
  ? JSON.parse(process.env.SSL_REJECT_UNAUTHORIZED)
  : false;
const connectionString = process.env.DATABASE_URL || '';
const config = parse(connectionString);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.host,
  port: parseInt(config.port, 10),
  username: config.user,
  password: config.password,
  database: config.database,
  ssl: {
    rejectUnauthorized,
  },
  entities: [Rooms, Games, Rounds, Participants],
  migrations: ['src/database/migrations/*.ts'],
  synchronize,
});

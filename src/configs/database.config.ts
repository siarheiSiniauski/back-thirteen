import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { parse } from 'pg-connection-string';

import { Games } from 'src/games/games.entity';
import { Participants } from 'src/participants/participants.entity';
import { Rooms } from 'src/rooms/rooms.entity';
import { Rounds } from 'src/rounds/rounds.entity';

dotenv.config();

const synchronize = process.env.DATABASE_SYNC
  ? JSON.parse(process.env.DATABASE_SYNC)
  : false;
const rejectUnauthorized = process.env.SSL_REJECT_UNAUTHORIZED
  ? JSON.parse(process.env.SSL_REJECT_UNAUTHORIZED)
  : false;
const connectionString = process.env.DATABASE_URL || '';
const config = parse(connectionString);

export const getDatabaseConfig = async (): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: config.host,
    port: parseInt(config.port, 10),
    username: config.user,
    password: config.password,
    database: config.database,
    ssl: {
      rejectUnauthorized: JSON.parse(rejectUnauthorized),
    },
    entities: [Games, Participants, Rooms, Rounds],
    synchronize,
  };
};

import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Games } from 'src/games/games.entity';
import { Participants } from 'src/participants/participants.entity';
import { Rooms } from 'src/rooms/rooms.entity';
import { Rounds } from 'src/rounds/rounds.entity';

export const getConfigPostgres = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    entities: [Rooms, Games, Rounds, Participants], // Укажите сущности
    synchronize: configService.get<boolean>('DATABASE_SYNC'), // Включить синхронизацию схемы
  };
};

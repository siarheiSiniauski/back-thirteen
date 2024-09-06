import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from './rooms/rooms.module';
import { getConfigPostgres } from './configs/postgres.config';
import { GamesModule } from './games/games.module';
import { RoundsController } from './rounds/rounds.controller';
import { RoundsModule } from './rounds/rounds.module';
import { ParticipantsController } from './participants/participants.controller';
import { ParticipantsModule } from './participants/participants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Делает ConfigModule глобальным, чтобы его не нужно было импортировать в каждый модуль
      envFilePath: '.env', // Путь к файлу .env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getConfigPostgres,
    }),
    // KafkaModule,
    // WebsocketModule,

    RoomsModule,
    GamesModule,
    RoundsModule,
    ParticipantsModule,
    UsersModule,
  ],
  providers: [],
  controllers: [RoundsController, ParticipantsController],
})
export class AppModule {}

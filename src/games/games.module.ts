import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Games } from './games.entity';
import { RoundsModule } from '../rounds/rounds.module';
import { ParticipantsModule } from '../participants/participants.module';
import { Rounds } from '../rounds/rounds.entity';
import { Participants } from '../participants/participants.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { HttpModule } from '@nestjs/axios';
import { Rooms } from 'src/rooms/rooms.entity';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Games, Rounds, Participants, User, Rooms]),
    RoundsModule,
    ParticipantsModule,
    HttpModule,
    RoomsModule,
  ],
  controllers: [GamesController],
  providers: [GamesService, UsersService],
  exports: [GamesService],
})
export class GamesModule {}

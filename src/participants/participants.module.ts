import { Module } from '@nestjs/common';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participants } from './participants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participants])],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  exports: [ParticipantsService, TypeOrmModule], // Экспортируйте TypeOrmModule, чтобы сделать его доступным для других модулей
})
export class ParticipantsModule {}

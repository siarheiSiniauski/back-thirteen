import { Module } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { Rounds } from './rounds.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoundsController } from './rounds.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rounds])],
  controllers: [RoundsController],
  providers: [RoundsService],
  exports: [RoundsService, TypeOrmModule],
})
export class RoundsModule {}

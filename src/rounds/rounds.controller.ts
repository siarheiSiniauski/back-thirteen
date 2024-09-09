import { Controller, Get, Param } from '@nestjs/common';
import { Rounds } from './rounds.entity';
import { RoundsService } from './rounds.service';

@Controller('rounds')
export class RoundsController {
  constructor(private readonly roundsService: RoundsService) {}

  // Эндпоинт для получения всех раундов
  @Get()
  async findAll(): Promise<Rounds[]> {
    return this.roundsService.findAll();
  }

  // Эндпоинт для получения раунда по id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Rounds> {
    return this.roundsService.findOne(id);
  }

  @Get('count/:gameId')
  async countByGameId(@Param('gameId') gameId: string): Promise<number> {
    return this.roundsService.countByGameId(gameId);
  }
}

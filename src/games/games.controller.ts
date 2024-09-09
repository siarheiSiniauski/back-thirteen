import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { Games } from './games.entity';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get(':id')
  async getGame(@Param('id') id: string): Promise<Games> {
    return this.gamesService.getGameById(id);
  }
  @Get()
  async getGames(
    @Query('participantId') participantId?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Games[]> {
    const games = await this.gamesService.getGames({
      participantId,
      page,
      limit,
    });
    return games;
  }

  @Post('join')
  async joinGame(
    @Body() body: { telegramId: number; roomId: string },
  ): Promise<Games> {
    const { telegramId, roomId } = body;
    return await this.gamesService.joinGame(telegramId, roomId);
  }
}

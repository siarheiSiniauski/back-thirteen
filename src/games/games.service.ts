import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from './games.entity';
import { Participants } from '../participants/participants.entity';
import { Rounds } from '../rounds/rounds.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Games)
    private gamesRepository: Repository<Games>,

    @InjectRepository(Rounds)
    private roundsRepository: Repository<Rounds>,

    @InjectRepository(Participants)
    private participantsRepository: Repository<Participants>,

    private usersService: UsersService,
  ) {}

  // Метод для получения игры по id
  async getGameById(gameId: string): Promise<Games> {
    // Попробуем найти игру по идентификатору
    const game = await this.gamesRepository.findOne({
      where: { id: gameId },
      relations: ['rounds', 'rounds.participants'], // Загрузка связанных сущностей, если это необходимо
    });

    // Если игра не найдена, выбрасываем исключение
    if (!game) {
      throw new NotFoundException(`Game with id ${gameId} not found`);
    }

    return game;
  }

  async getGames({
    participantId,
    page,
    limit,
  }: {
    participantId?: string;
    page: number;
    limit: number;
  }): Promise<any> {
    const queryBuilder: SelectQueryBuilder<Games> =
      this.gamesRepository.createQueryBuilder('game');

    // Filter by participant if provided
    if (participantId) {
      queryBuilder
        .innerJoin('game.rounds', 'round') // Assuming game has a relation to rounds
        .innerJoin('round.participants', 'participant')
        .where('participant.id = :participantId', { participantId });
    }

    // Pagination
    queryBuilder.skip((page - 1) * limit).take(limit);

    const [games, total] = await queryBuilder.getManyAndCount();

    return {
      data: games,
      total,
      page,
      limit,
    };
  }

  async createGame(roomId: string, telegramId: number): Promise<any> {
    const user = await this.usersService.findByTelegramId(telegramId + '');

    const game = this.gamesRepository.create({
      status: 'RECRUITMENT',
      roomId,
      players: [
        {
          telegramId: user.telegramId,
          avatar: user.avatar,
        },
      ],
    });
    await this.gamesRepository.save(game);

    // Create a new round for the game
    const round = await this.createRound(game);

    // // Create a new participant and associate it with the round
    const participant = this.participantsRepository.create({
      telegramId,
      position: 1,
      name: user.name,
      avatar: user.avatar,
      isChamber: false,
      isShoot: false,
      isReady: false,
      shoot: null,
      round,
    });

    await this.participantsRepository.save(participant);

    return game;
  }

  async joinGame(roomId: string, telegramId: number): Promise<Games> {
    console.log(roomId, telegramId);

    // Find the game by gameId and check if it has RECRUITMENT status
    let game = await this.gamesRepository.findOne({
      where: { roomId, status: 'RECRUITMENT' },
      relations: ['rounds', 'rounds.participants'],
    });

    const user = await this.usersService.findByTelegramId(telegramId + '');

    if (!game) {
      // If no game found with RECRUITMENT status, create a new game
      game = await this.createGame(roomId, telegramId);
    }

    // Return the updated game with its rounds and participants

    const result = await this.gamesRepository.findOne({
      where: { id: game.id },
      relations: ['rounds', 'rounds.participants'],
    });

    console.log(result);

    return result;
  }

  private async createRound(game: Games): Promise<Rounds> {
    const round = this.roundsRepository.create({
      game,
    });

    return this.roundsRepository.save(round);
  }
}

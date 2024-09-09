import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from './games.entity';
import { Participants } from '../participants/participants.entity';
import { Rounds } from '../rounds/rounds.entity';
import { UsersService } from 'src/users/users.service';
import { Rooms } from 'src/rooms/rooms.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Games)
    private gamesRepository: Repository<Games>,

    @InjectRepository(Rounds)
    private roundsRepository: Repository<Rounds>,

    @InjectRepository(Participants)
    private participantsRepository: Repository<Participants>,

    @InjectRepository(Rooms)
    private roomsRepository: Repository<Rooms>,

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

  async createGame(
    roomId: string,
    telegramId: number,
    slots: number,
  ): Promise<any> {
    const user = await this.usersService.findByTelegramId(telegramId + '');

    const game = this.gamesRepository.create({
      status: 'RECRUITMENT',
      roomId,
      slots,
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

    // Create a new participant and associate it with the round
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

  async joinGame(telegramId: number, roomId: string): Promise<Games> {
    // Find the game by gameId and check if it has RECRUITMENT status
    let game = await this.gamesRepository.findOne({
      where: { roomId, status: 'RECRUITMENT' },
      relations: ['rounds', 'rounds.participants'],
    });

    const room = await this.roomsRepository.findOne({ where: { id: roomId } });

    if (!game) {
      // If no game found with RECRUITMENT status, create a new game
      game = await this.createGame(roomId, telegramId, room.slots);
    } else {
      const user = await this.usersService.findByTelegramId(telegramId + '');

      const round = game.rounds[0];

      const position = round.participants.length + 1;

      let existsParticipant = round.participants.find(
        (el) => el.telegramId === telegramId,
      );

      if (!existsParticipant) {
        existsParticipant = this.participantsRepository.create({
          telegramId,
          position,
          name: user.name,
          avatar: user.avatar,
          isChamber: false,
          isShoot: false,
          isReady: false,
          shoot: null,
          round,
        });

        await this.participantsRepository.save(existsParticipant);

        await this.roundsRepository.save({
          ...round,
          participants: [...round.participants, existsParticipant],
        });

        await this.gamesRepository.save({
          ...game,
          players: [...game.players, { telegramId, avatar: user.avatar }],
        });
      }
    }

    // Return the updated game with its rounds and participants
    const result = await this.gamesRepository.findOne({
      where: { id: game.id },
      relations: ['rounds', 'rounds.participants'],
    });

    return result;
  }

  private async createRound(game: Games): Promise<Rounds> {
    const round = this.roundsRepository.create({
      game,
    });

    return this.roundsRepository.save(round);
  }
}

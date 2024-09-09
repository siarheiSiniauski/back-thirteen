import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rounds } from './rounds.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoundsService {
  constructor(
    @InjectRepository(Rounds)
    private roundsRepository: Repository<Rounds>,
  ) {}

  // Получение всех раундов
  async findAll(): Promise<Rounds[]> {
    return this.roundsRepository.find({ relations: ['participants', 'game'] });
  }

  // Получение раунда по id
  async findOne(id: string): Promise<Rounds> {
    return this.roundsRepository.findOne({
      where: { id },
      relations: ['participants', 'game'],
    });
  }

  // Метод для получения количества раундов по gameId
  async countByGameId(gameId: string): Promise<number> {
    return this.roundsRepository.count({
      where: { gameId },
    });
  }
}

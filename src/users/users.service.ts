import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs'; // Используем для преобразования Observable в Promise
import { ConfigService } from '@nestjs/config';
import { validate } from '@telegram-apps/init-data-node';
import { IUser } from './user.interface';

import { getUserApiConfig } from '../configs/user-http.config';

const api = getUserApiConfig();

@Injectable()
export class UsersService {
  private readonly telegramBotToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.telegramBotToken =
      this.configService.get<string>('TELEGRAM_BOT_TOKEN');
  }

  async verifyTelegramData(query: any) {
    const initData =
      `query_id=${query.query_id}` +
      `&user=${query.user}` +
      `&auth_date=${query.auth_date}` +
      `&hash=${query.hash}`;

    const user: IUser = JSON.parse(query.user);

    try {
      validate(initData, this.telegramBotToken);

      const data = await this.findByTelegramId(user.id + '');

      return { verify: true, user: data };
    } catch {
      return { verify: false };
    }
  }

  async findByTelegramId(telegramId: string): Promise<any> {
    const url = `${api.url}/users/${telegramId}`; // URL внешнего API

    try {
      const res = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'x-battle-room': api.key,
          },
        }),
      );

      return res.data;
    } catch {
      throw new NotFoundException(
        `User with Telegram ID ${telegramId} not found`,
      );
    }
  }
}

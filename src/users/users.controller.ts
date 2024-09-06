import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('verify')
  verifyTelegramData(@Query() query: string) {
    return this.usersService.verifyTelegramData(query);
  }

  @Get(':telegramId')
  async getUserById(@Param('telegramId') telegramId: string): Promise<any> {
    return this.usersService.findByTelegramId(telegramId);
  }
}

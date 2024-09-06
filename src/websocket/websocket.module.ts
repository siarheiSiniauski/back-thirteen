import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebSocketService } from './websocket.service';

@Module({
  imports: [ConfigModule], // Импортируем ConfigModule для доступа к ConfigService
  providers: [WebSocketService], // Регистрируем WebSocketService
  exports: [WebSocketService], // Экспортируем WebSocketService, если нужно использовать в других модулях
})
export class WebsocketModule {}

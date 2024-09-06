import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Rooms } from './rooms.entity';
// import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rooms]),
    //WebsocketModule
  ], // Подключите сущность Room
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}

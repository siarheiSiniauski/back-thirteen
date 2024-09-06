import { Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from '../rooms/rooms.service'; // Путь к вашему RoomsService

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebSocketService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly roomsService: RoomsService) {}

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized', server);
  }

  handleConnection(client: Socket) {
    console.log('Client connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
  }
}

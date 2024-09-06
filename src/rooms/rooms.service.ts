import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rooms } from './rooms.entity';
// import { WebSocketService } from '../websocket/websocket.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms)
    private roomsRepository: Repository<Rooms>,
    // private readonly webSocketService: WebSocketService,
  ) {}

  findAll(): Promise<Rooms[]> {
    const rooms = this.roomsRepository.find();

    // this.webSocketService.server.emit('rooms', rooms);
    return rooms;
  }

  findOne(id: string): Promise<Rooms> {
    return this.roomsRepository.findOneBy({ id });
  }

  async create(room: Partial<Rooms>): Promise<Rooms> {
    const newRoom = this.roomsRepository.create(room);
    const savedRoom = await this.roomsRepository.save(newRoom);
    return savedRoom;
  }

  async update(id: string, room: Partial<Rooms>): Promise<Rooms> {
    await this.roomsRepository.update(id, room);
    const updatedRoom = await this.findOne(id);
    return updatedRoom;
  }

  async remove(id: string): Promise<void> {
    await this.roomsRepository.delete(id);
  }
}

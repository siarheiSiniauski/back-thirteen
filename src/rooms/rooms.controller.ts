import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Rooms } from './rooms.entity';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  getAllRooms(): Promise<Rooms[]> {
    return this.roomsService.findAll();
  }

  @Get('/:id')
  getRoomById(@Param('id') id: string): Promise<Rooms> {
    return this.roomsService.findOne(id);
  }

  @Post()
  createRoom(@Body() roomData: Partial<Rooms>): Promise<Rooms> {
    return this.roomsService.create(roomData);
  }

  @Patch('/:id')
  updateRoom(
    @Param('id') id: string,
    @Body() roomData: Partial<Rooms>,
  ): Promise<Rooms> {
    return this.roomsService.update(id, roomData);
  }

  @Delete('/:id')
  removeRoom(@Param('id') id: string): Promise<void> {
    return this.roomsService.remove(id);
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room } from './rooms.entity';

const mockRoomsService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('RoomsController', () => {
  let controller: RoomsController;
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        {
          provide: RoomsService,
          useValue: mockRoomsService,
        },
      ],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllRooms', () => {
    it('should return an array of rooms', async () => {
      const result = [
        { id: '1', name: 'Room 1', slots: 10, price: 100, pool: 500 },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result as Room[]);

      expect(await controller.getAllRooms()).toEqual(result);
    });
  });

  describe('getRoomById', () => {
    it('should return a single room', async () => {
      const result = {
        id: '1',
        name: 'Room 1',
        slots: 10,
        price: 100,
        pool: 500,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result as Room);

      expect(await controller.getRoomById('1')).toEqual(result);
    });
  });

  describe('createRoom', () => {
    it('should create and return a room', async () => {
      const roomData = { name: 'New Room', slots: 5, price: 200, pool: 1000 };
      const result = { id: '2', ...roomData };

      jest.spyOn(service, 'create').mockResolvedValue(result as Room);

      expect(await controller.createRoom(roomData)).toEqual(result);
    });
  });

  describe('updateRoom', () => {
    it('should update and return a room', async () => {
      const roomData = {
        name: 'Updated Room',
        slots: 8,
        price: 250,
        pool: 1500,
      };
      const result = { id: '1', ...roomData };

      jest.spyOn(service, 'update').mockResolvedValue(result as Room);

      expect(await controller.updateRoom('1', roomData)).toEqual(result);
    });
  });

  describe('removeRoom', () => {
    it('should remove the room', async () => {
      const removeSpy = jest
        .spyOn(service, 'remove')
        .mockResolvedValue(undefined);

      await controller.removeRoom(1);
      expect(removeSpy).toHaveBeenCalledWith(1);
    });
  });
});

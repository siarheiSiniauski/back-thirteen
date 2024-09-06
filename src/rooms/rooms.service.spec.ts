import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './rooms.entity';
import { RoomsService } from './rooms.service';

const mockRoomRepository = () => ({
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('RoomsService', () => {
  let service: RoomsService;
  let repository: Repository<Room>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: getRepositoryToken(Room),
          useValue: mockRoomRepository(),
        },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
    repository = module.get<Repository<Room>>(getRepositoryToken(Room));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of rooms', async () => {
      const rooms = [
        { id: '1', name: 'Room 1', slots: 10, price: 100, pool: 500 },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(rooms as Room[]);

      expect(await service.findAll()).toEqual(rooms);
    });
  });

  describe('findOne', () => {
    it('should return a single room', async () => {
      const room = {
        id: '1',
        name: 'Room 1',
        slots: 10,
        price: 100,
        pool: 500,
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(room as Room);

      expect(await service.findOne('1')).toEqual(room);
    });

    it('should return null if room is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      expect(await service.findOne('1')).toBeNull();
    });
  });

  describe('create', () => {
    it('should successfully insert a room', async () => {
      const roomData = { name: 'New Room', slots: 5, price: 200, pool: 1000 };
      const room = { id: '2', ...roomData };

      jest.spyOn(repository, 'create').mockReturnValue(room as any);
      jest.spyOn(repository, 'save').mockResolvedValue(room as Room);

      expect(await service.create(roomData)).toEqual(room);
    });
  });

  describe('update', () => {
    it('should successfully update a room', async () => {
      const roomData = {
        name: 'Updated Room',
        slots: 8,
        price: 250,
        pool: 1500,
      };
      const room = { id: '1', ...roomData };

      jest.spyOn(repository, 'update').mockResolvedValue(undefined);
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(room as Room);

      expect(await service.update('1', roomData)).toEqual(room);
    });
  });

  describe('remove', () => {
    it('should remove the room', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});

import { DataSource } from 'typeorm';

import { Rooms } from 'src/rooms/rooms.entity';

export class RoomsSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const roomRepository = dataSource.getRepository(Rooms);

    const rooms = [
      {
        name: 'room-target',
        slots: 13,
        price: 0.1,
        pool: 1.13,
        isVisible: true,
        isSoon: false,
      },
      {
        name: 'room-precise_shot',
        slots: 13,
        price: 0.3,
        pool: 3.39,
        isVisible: true,
        isSoon: false,
      },
      {
        name: 'room-fire_line',
        slots: 13,
        price: 0.5,
        pool: 5.66,
        isVisible: true,
        isSoon: false,
      },
      {
        name: 'room-sharpshooter',
        slots: 13,
        price: 1,
        pool: 11.31,
        isVisible: true,
        isSoon: false,
      },
      {
        name: 'room-cowboy_duel',
        slots: 13,
        price: 2,
        pool: 22.62,
        isVisible: true,
        isSoon: false,
      },
      {
        name: 'room-laser_arc',
        slots: 13,
        price: 5,
        pool: 56.55,
        isVisible: true,
        isSoon: false,
      },
      {
        name: 'room-bullet_path',
        slots: 13,
        price: 10,
        pool: 113.1,
        isVisible: true,
        isSoon: false,
      },
      {
        name: 'room-thunderbolt',
        slots: 13,
        price: 20,
        pool: 226.2,
        isVisible: true,
        isSoon: false,
      },
      {
        name: 'room-edge_of_fate',
        slots: 13,
        price: 13,
        pool: 147.03,
        isVisible: true,
        isSoon: false,
      },
      {
        name: 'room-sniper_point',
        slots: 13,
        price: 15,
        pool: 169.65,
        isVisible: true,
        isSoon: false,
      },
      {
        name: 'room-hit_zone',
        slots: 13,
        price: 30,
        pool: 339.3,
        isVisible: true,
        isSoon: true,
      },
      {
        name: 'room-caliber_of_chaos',
        slots: 13,
        price: 50,
        pool: 565.5,
        isVisible: true,
        isSoon: true,
      },
      {
        name: 'room-cry_of_the_silent_shot',
        slots: 13,
        price: 100,
        pool: 1131,
        isVisible: true,
        isSoon: true,
      },
    ];

    await roomRepository.save(rooms);
  }
}

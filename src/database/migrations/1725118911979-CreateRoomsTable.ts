import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoomsTable1725118911979 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rooms',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'slots',
            type: 'int',
          },
          {
            name: 'price',
            type: 'float',
          },
          {
            name: 'pool',
            type: 'float',
          },
          {
            name: 'isVisible',
            type: 'boolean',
          },
          {
            name: 'isSoon',
            type: 'boolean',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rooms');
  }
}

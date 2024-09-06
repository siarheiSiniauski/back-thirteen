import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddRoomIdToGamesTable1725622872146 implements MigrationInterface {
  name = 'AddRoomIdToGamesTable1725622872146';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'games',
      new TableColumn({
        name: 'roomId',
        type: 'uuid',
        isNullable: false, // NOT NULL constraint
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('games', 'roomId');
  }
}

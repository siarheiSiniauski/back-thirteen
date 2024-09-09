import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRoundsTable1725198312757 implements MigrationInterface {
  name = 'CreateRoundsTable1725198312757';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the rounds table
    await queryRunner.createTable(
      new Table({
        name: 'rounds',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'gameId',
            type: 'uuid',
          },
          {
            name: 'nextRound',
            type: 'uuid',
            isNullable: true, // make it nullable since it's not always required
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['RECRUITMENT', 'WAITING', 'READY', 'GAME', 'GAME_OVER'],
            default: "'RECRUITMENT'",
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    // Create a foreign key relationship with the games table
    await queryRunner.createForeignKey(
      'rounds',
      new TableForeignKey({
        columnNames: ['gameId'],
        referencedTableName: 'games',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key relationship
    const table = await queryRunner.getTable('rounds');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('gameId') !== -1,
    );
    await queryRunner.dropForeignKey('rounds', foreignKey);

    // Drop the rounds table
    await queryRunner.dropTable('rounds');
  }
}

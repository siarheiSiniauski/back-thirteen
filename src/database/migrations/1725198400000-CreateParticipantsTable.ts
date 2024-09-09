import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateParticipantsTable1725198400000
  implements MigrationInterface
{
  name = 'CreateParticipantsTable1725198400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'participants',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'roundId',
            type: 'uuid',
          },
          {
            name: 'telegramId',
            type: 'int',
          },
          {
            name: 'position',
            type: 'int',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'avatar',
            type: 'varchar',
          },
          {
            name: 'isChamber',
            type: 'boolean',
            default: false,
          },
          {
            name: 'isShoot',
            type: 'boolean',
            default: false,
          },
          {
            name: 'isReady',
            type: 'boolean',
            default: false,
          },
          {
            name: 'shoot',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'participants',
      new TableForeignKey({
        columnNames: ['roundId'],
        referencedTableName: 'rounds',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('participants', 'FK_roundId');
    await queryRunner.dropTable('participants');
  }
}

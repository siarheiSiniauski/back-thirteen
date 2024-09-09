import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSlotsColumnToGamesTable1725866349409
  implements MigrationInterface
{
  name = 'AddSlotsColumnToGamesTable1725866349409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "games" ADD "slots" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "slots"`);
  }
}

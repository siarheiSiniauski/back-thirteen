import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteRoundIdGamesTable1725623973830
  implements MigrationInterface
{
  name = 'DeleteRoundIdGamesTable1725623973830';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "roomId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "games" ADD "roomId" uuid NOT NULL`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTypeShootToParticipantsTable1725623524988
  implements MigrationInterface
{
  name = 'UpdateTypeShootToParticipantsTable1725623524988';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "participants" ALTER COLUMN "shoot" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "participants" ALTER COLUMN "shoot" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "participants" ALTER COLUMN "shoot" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "participants" ALTER COLUMN "shoot" SET NOT NULL`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTypeAvatarToParticipantsTable1725624636644
  implements MigrationInterface
{
  name = 'UpdateTypeAvatarToParticipantsTable1725624636644';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "participants" ALTER COLUMN "avatar" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "participants" ALTER COLUMN "avatar" SET NOT NULL`,
    );
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniquePartnerEmail1730383395133 implements MigrationInterface {
    name = 'RemoveUniquePartnerEmail1730383395133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partner" DROP CONSTRAINT "UQ_39ba44d32530f1c7076c182ebc8"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partner" ADD CONSTRAINT "UQ_39ba44d32530f1c7076c182ebc8" UNIQUE ("email")`);
    }

}

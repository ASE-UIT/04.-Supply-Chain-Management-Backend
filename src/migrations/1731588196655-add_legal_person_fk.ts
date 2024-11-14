import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLegalPersonFk1731588196655 implements MigrationInterface {
    name = 'AddLegalPersonFk1731588196655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partner" ADD "legalPersonId" integer`);
        await queryRunner.query(`ALTER TABLE "partner" ADD CONSTRAINT "UQ_4bdb2b56935cd4ec8d6ed98fa5e" UNIQUE ("legalPersonId")`);
        await queryRunner.query(`ALTER TABLE "driver" ADD "vehicleId" integer`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "UQ_528b955dccfe227f46c4a50c4c2" UNIQUE ("vehicleId")`);
        await queryRunner.query(`ALTER TABLE "partner" ADD CONSTRAINT "FK_4bdb2b56935cd4ec8d6ed98fa5e" FOREIGN KEY ("legalPersonId") REFERENCES "legal_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "FK_528b955dccfe227f46c4a50c4c2" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "FK_528b955dccfe227f46c4a50c4c2"`);
        await queryRunner.query(`ALTER TABLE "partner" DROP CONSTRAINT "FK_4bdb2b56935cd4ec8d6ed98fa5e"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "UQ_528b955dccfe227f46c4a50c4c2"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP COLUMN "vehicleId"`);
        await queryRunner.query(`ALTER TABLE "partner" DROP CONSTRAINT "UQ_4bdb2b56935cd4ec8d6ed98fa5e"`);
        await queryRunner.query(`ALTER TABLE "partner" DROP COLUMN "legalPersonId"`);
    }

}

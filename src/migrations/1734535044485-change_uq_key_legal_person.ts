import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUqKeyLegalPerson1734535044485 implements MigrationInterface {
    name = 'ChangeUqKeyLegalPerson1734535044485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partner" DROP CONSTRAINT "FK_4bdb2b56935cd4ec8d6ed98fa5e"`);
        await queryRunner.query(`ALTER TABLE "partner" DROP CONSTRAINT "UQ_4bdb2b56935cd4ec8d6ed98fa5e"`);
        await queryRunner.query(`ALTER TABLE "partner" ADD CONSTRAINT "FK_4bdb2b56935cd4ec8d6ed98fa5e" FOREIGN KEY ("legalPersonId") REFERENCES "legal_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partner" DROP CONSTRAINT "FK_4bdb2b56935cd4ec8d6ed98fa5e"`);
        await queryRunner.query(`ALTER TABLE "partner" ADD CONSTRAINT "UQ_4bdb2b56935cd4ec8d6ed98fa5e" UNIQUE ("legalPersonId")`);
        await queryRunner.query(`ALTER TABLE "partner" ADD CONSTRAINT "FK_4bdb2b56935cd4ec8d6ed98fa5e" FOREIGN KEY ("legalPersonId") REFERENCES "legal_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

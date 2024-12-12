import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLegalPerson1731587700703 implements MigrationInterface {
    name = 'AddLegalPerson1731587700703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "legal_person" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "email" character varying NOT NULL, "identityNumber" character varying NOT NULL, "address" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_f74fd434bd5c87419aedfd683b7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "legal_person"`);
    }

}

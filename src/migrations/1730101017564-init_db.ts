import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1730101017564 implements MigrationInterface {
    name = 'InitDb1730101017564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "quantity" integer NOT NULL, "unit" character varying NOT NULL, "status" character varying NOT NULL, "type" character varying NOT NULL, "size" double precision NOT NULL, "weight" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "partnerId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partner" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_39ba44d32530f1c7076c182ebc8" UNIQUE ("email"), CONSTRAINT "PK_8f34ff11ddd5459eacbfacd48ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "type" character varying NOT NULL, "status" character varying NOT NULL, "capacity" integer NOT NULL, "availability" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "partnerId" integer, CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_0fe00fa20632a4f1defc86d3a44" FOREIGN KEY ("partnerId") REFERENCES "partner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse" ADD CONSTRAINT "FK_fa6043dbf3da086c40496166869" FOREIGN KEY ("partnerId") REFERENCES "partner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse" DROP CONSTRAINT "FK_fa6043dbf3da086c40496166869"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0fe00fa20632a4f1defc86d3a44"`);
        await queryRunner.query(`DROP TABLE "warehouse"`);
        await queryRunner.query(`DROP TABLE "partner"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

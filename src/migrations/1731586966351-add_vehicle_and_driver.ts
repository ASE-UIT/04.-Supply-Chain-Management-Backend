import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVehicleAndDriver1731586966351 implements MigrationInterface {
    name = 'AddVehicleAndDriver1731586966351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "driver" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "licenseNumber" character varying NOT NULL, "licenseType" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_79353209a34031fc69a94b0161f" UNIQUE ("licenseNumber"), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "licensePlate" character varying NOT NULL, "type" character varying NOT NULL, "status" character varying NOT NULL, "capacity" integer NOT NULL, "availability" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "partnerId" integer, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_e08c5453ca2c08f4dccde6946a7" FOREIGN KEY ("partnerId") REFERENCES "partner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_e08c5453ca2c08f4dccde6946a7"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
        await queryRunner.query(`DROP TABLE "driver"`);
    }

}

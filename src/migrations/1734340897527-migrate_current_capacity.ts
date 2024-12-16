import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateCurrentCapacity1734340897527 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE warehouse SET "currentCapacity" = "capacity" WHERE "currentCapacity" = 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

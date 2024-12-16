import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeOrderFlow1734364461150 implements MigrationInterface {
    name = 'ChangeOrderFlow1734364461150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "quantity" TO "unitPrice"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "total" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "unitPrice"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "unitPrice" double precision DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "warehouse_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "unitPrice"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "unitPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "unitPrice" TO "quantity"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

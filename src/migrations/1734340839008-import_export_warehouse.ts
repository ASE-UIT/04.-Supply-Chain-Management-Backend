import { MigrationInterface, QueryRunner } from "typeorm";

export class ImportExportWarehouse1734340839008 implements MigrationInterface {
    name = 'ImportExportWarehouse1734340839008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "warehouse_product" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "warehouseId" integer, "productId" integer, CONSTRAINT "PK_327c519be4aeb4ddabc14e595ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse_import_order" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "importDate" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "warehouseId" integer, "createdById" integer, "approvedById" integer, CONSTRAINT "PK_1e35684883906bbef74c860d5e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse_import_item" ("id" SERIAL NOT NULL, "unitPrice" integer NOT NULL, "quantityDocument" integer NOT NULL, "quantityActual" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "productId" integer, "orderId" integer, CONSTRAINT "PK_fa672a4cccf352a1bf8f2280c6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse_export_item" ("id" SERIAL NOT NULL, "unitPrice" integer NOT NULL, "quantityDocument" integer NOT NULL, "quantityActual" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "productId" integer, "orderId" integer, CONSTRAINT "PK_73562fe70ef37db3aa57d370b0f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse_export_order" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "exportDate" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "warehouseId" integer, "createdById" integer, "approvedById" integer, CONSTRAINT "PK_8640089da9257c4afa54d633359" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "presenter" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "presenterPhoneNumber" character varying NOT NULL, "presenterEmail" character varying NOT NULL, "presenterAddress" character varying NOT NULL, "taxCode" character varying NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "remark" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" integer, "customerId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "productId" integer, "orderId" integer, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "warehouse" ADD "currentCapacity" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "warehouse_product" ADD CONSTRAINT "FK_a8c9aee14d47ec7b3f2ac429ebc" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse_product" ADD CONSTRAINT "FK_3f934c4772e7c7f2c66d7ea4e72" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse_import_order" ADD CONSTRAINT "FK_b3a9753d38dfb98038af9ccec7e" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse_import_order" ADD CONSTRAINT "FK_936ed05b39fb54ab6766c7f86cb" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse_import_order" ADD CONSTRAINT "FK_c501103b56e2d7228c47fdc413a" FOREIGN KEY ("approvedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse_import_item" ADD CONSTRAINT "FK_a91b23e2c8d71af9d85955063d4" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse_import_item" ADD CONSTRAINT "FK_de1f77b5ed354d085b4afb2a11e" FOREIGN KEY ("orderId") REFERENCES "warehouse_import_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse_export_item" ADD CONSTRAINT "FK_26482f7422edd9ff40c3405122c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse_export_item" ADD CONSTRAINT "FK_0c41bd494870bec1e93dba32861" FOREIGN KEY ("orderId") REFERENCES "warehouse_export_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse_export_order" ADD CONSTRAINT "FK_3bb8169e9588d05f6d35f1d4de0" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse_export_order" ADD CONSTRAINT "FK_fb4767bafb096fcbc628a12a42b" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse_export_order" ADD CONSTRAINT "FK_cc0ab18e681d1263d2994691084" FOREIGN KEY ("approvedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_de6fa8b07fd7e0a8bf9edb5eb38" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_de6fa8b07fd7e0a8bf9edb5eb38"`);
        await queryRunner.query(`ALTER TABLE "warehouse_export_order" DROP CONSTRAINT "FK_cc0ab18e681d1263d2994691084"`);
        await queryRunner.query(`ALTER TABLE "warehouse_export_order" DROP CONSTRAINT "FK_fb4767bafb096fcbc628a12a42b"`);
        await queryRunner.query(`ALTER TABLE "warehouse_export_order" DROP CONSTRAINT "FK_3bb8169e9588d05f6d35f1d4de0"`);
        await queryRunner.query(`ALTER TABLE "warehouse_export_item" DROP CONSTRAINT "FK_0c41bd494870bec1e93dba32861"`);
        await queryRunner.query(`ALTER TABLE "warehouse_export_item" DROP CONSTRAINT "FK_26482f7422edd9ff40c3405122c"`);
        await queryRunner.query(`ALTER TABLE "warehouse_import_item" DROP CONSTRAINT "FK_de1f77b5ed354d085b4afb2a11e"`);
        await queryRunner.query(`ALTER TABLE "warehouse_import_item" DROP CONSTRAINT "FK_a91b23e2c8d71af9d85955063d4"`);
        await queryRunner.query(`ALTER TABLE "warehouse_import_order" DROP CONSTRAINT "FK_c501103b56e2d7228c47fdc413a"`);
        await queryRunner.query(`ALTER TABLE "warehouse_import_order" DROP CONSTRAINT "FK_936ed05b39fb54ab6766c7f86cb"`);
        await queryRunner.query(`ALTER TABLE "warehouse_import_order" DROP CONSTRAINT "FK_b3a9753d38dfb98038af9ccec7e"`);
        await queryRunner.query(`ALTER TABLE "warehouse_product" DROP CONSTRAINT "FK_3f934c4772e7c7f2c66d7ea4e72"`);
        await queryRunner.query(`ALTER TABLE "warehouse_product" DROP CONSTRAINT "FK_a8c9aee14d47ec7b3f2ac429ebc"`);
        await queryRunner.query(`ALTER TABLE "warehouse" DROP COLUMN "currentCapacity"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "warehouse_export_order"`);
        await queryRunner.query(`DROP TABLE "warehouse_export_item"`);
        await queryRunner.query(`DROP TABLE "warehouse_import_item"`);
        await queryRunner.query(`DROP TABLE "warehouse_import_order"`);
        await queryRunner.query(`DROP TABLE "warehouse_product"`);
    }

}

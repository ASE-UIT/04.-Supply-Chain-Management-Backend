import { WarehouseController } from "@scm/controllers/WarehouseController";
import { User } from "@scm/entities/user.entity";
import { Warehouse } from "@scm/entities/warehouse.entity";
import { WarehouseService } from "@scm/services/WarehouseService";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Partner } from "@scm/entities/partner.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Warehouse,
            Partner,
        ])
    ],
    controllers: [WarehouseController],
    providers: [WarehouseService],
    exports:[WarehouseService],
})
export class WarehouseModule {}

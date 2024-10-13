import { WarehouseController } from "@gstb/controllers/WarehouseController";
import { Warehouse } from "@gstb/entities/warehouse.entity";
import { WarehouseService } from "@gstb/services/WarehouseService";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Warehouse])],
    controllers: [WarehouseController],
    providers: [WarehouseService],
})
export class WarehouseModule {}

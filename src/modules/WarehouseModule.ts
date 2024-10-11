import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseController } from '../controllers/WarehouseController';
import { WarehouseService } from '../services/WarehouseService';
import { Warehouse } from '@gstb/entities/warehouse.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Warehouse])
    ],
    providers: [WarehouseService],
    controllers: [
        WarehouseController
    ],
})
export class WarehouseModule { }


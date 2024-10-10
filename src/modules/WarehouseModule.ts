import { Module } from '@nestjs/common';
import { WarehouseController } from '../controllers/WarehouseController';
import { WarehouseService } from '../services/WarehouseService';
import { Warehouse } from '@gstb/entities/warehouse.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Warehouse', schema: Warehouse }])
    ],
    providers: [WarehouseService],
    controllers: [
        WarehouseController
    ],
})
export class WarehouseModule { }


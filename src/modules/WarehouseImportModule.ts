import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@scm/entities/order.entity';
import { Partner } from '@scm/entities/partner.entity';
import { Product } from '@scm/entities/product.entity';
import { User } from '@scm/entities/user.entity';
import { Warehouse } from '@scm/entities/warehouse.entity';
import { WarehouseImportItem } from '@scm/entities/warehouse_import_item.entity';
import { WarehouseProduct } from '@scm/entities/warehouse_product.entity';
import { WarehouseImportController } from '../controllers/WarehouseImportController';
import { WarehouseImportOrder } from '../entities/warehouse_import_order.entity';
import { WarehouseImportService } from '../services/WarehouseImportService';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            WarehouseImportOrder,
            WarehouseImportItem,
            Warehouse,
            User,
            Partner,
            Product,
            WarehouseProduct,
            Order,
        ])
    ],
    controllers: [WarehouseImportController],
    providers: [WarehouseImportService],
})
export class WarehouseImportModule { }

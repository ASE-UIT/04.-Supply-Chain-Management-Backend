import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseExportOrder } from 'src/entities/warehouse_export_order.entity';
import { WarehouseExportItem } from 'src/entities/warehouse_export_item.entity';
import { Warehouse } from 'src/entities/warehouse.entity';
import { User } from 'src/entities/user.entity';
import { Partner } from 'src/entities/partner.entity';
import { WarehouseExportController } from 'src/controllers/WarehouseExportController';
import { WarehouseExportService } from 'src/services/WarehouseExportService';
import { Product } from '@scm/entities/product.entity';
import { WarehouseProduct } from '@scm/entities/warehouse_product.entity';
import { Order } from '@scm/entities/order.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      WarehouseExportOrder,
      WarehouseExportItem,
      Warehouse,
      User,
      Partner,
      Product,
      WarehouseProduct,
      Order,
    ]),
  ],
  controllers: [WarehouseExportController],
  providers: [WarehouseExportService],
  exports: [WarehouseExportService],
})
export class WarehouseExportModule { }

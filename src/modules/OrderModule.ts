import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@scm/entities/order.entity';
import { Warehouse } from '@scm/entities/warehouse.entity';
import { OrderService } from '../services/OrderService';
import { OrderController } from '../controllers/OrderController';
import { OrderItem } from '@scm/entities/order_item.entity';
import { Customer } from '@scm/entities/customer.entity';
import { User } from '@scm/entities/user.entity';
import { WarehouseProduct } from '@scm/entities/warehouse_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, WarehouseProduct, Warehouse, Customer, OrderItem, User])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule { }

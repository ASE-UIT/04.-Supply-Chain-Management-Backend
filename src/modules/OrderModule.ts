import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@scm/entities/order.entity';
import { Product } from '@scm/entities/product.entity';
import { Warehouse } from '@scm/entities/warehouse.entity';
import { OrderService } from '../services/OrderService';
import { OrderController } from '../controllers/OrderController';
import { OrderItem } from '@scm/entities/order_item.entity';
import { Customer } from '@scm/entities/customer.entity';
import { User } from '@scm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, Warehouse, Customer, OrderItem, User])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule { }

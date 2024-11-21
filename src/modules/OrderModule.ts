import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@scm/entities/order.entity';
import { Product } from '@scm/entities/product.entity';
import { Warehouse } from '@scm/entities/warehouse.entity';
import { OrderService } from '../services/OrderService';
import { OrderController } from '../controllers/OrderController';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, Warehouse])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}

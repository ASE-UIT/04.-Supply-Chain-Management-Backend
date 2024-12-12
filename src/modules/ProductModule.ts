import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from '../services/ProductService';
import { ProductController } from '../controllers/ProductController';
import { Product } from '../entities/product.entity';
import { Partner } from '@scm/entities/partner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Partner,
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

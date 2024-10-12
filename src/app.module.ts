import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/ProductModule';
import { Product } from './entities/product.entity';
import { Partner } from './entities/partner.entity';
import { Warehouse } from './entities/warehouse.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['local.env', 'staging.env', 'production.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        Product,
        Partner,
        Warehouse,
        User
      ],
      synchronize: false,
    }),
    ProductModule
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseModule } from './modules/WarehouseModule';
import { ProductModule } from './modules/ProductModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['local.env', 'staging.env', 'production.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['/../entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    WarehouseModule,
    ProductModule
  ],
})
export class AppModule {}

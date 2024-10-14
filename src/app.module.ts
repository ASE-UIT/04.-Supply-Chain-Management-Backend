import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/ProductModule';
import { WarehouseModule } from './modules/WarehouseModule';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['local.env', 'staging.env', 'production.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['../src/entities/*.entity.ts'],
      synchronize: false,
    }),
    ProductModule,
    WarehouseModule,
  ],
})
export class AppModule {}

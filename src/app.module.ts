import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envFiles } from './config/env';
import typeorm from './config/typeorm';
import { DriverModule } from './modules/DriverModule';
import { LegalPersonModule } from './modules/LegalPersonModule';
import { PartnerModule } from './modules/PartnerModule';
import { OrderModule } from './modules/OrderModule';
import { ProductModule } from './modules/ProductModule';
import { VehicleModule } from './modules/VehicleModule';
import { WarehouseModule } from './modules/WarehouseModule';
import { WarehouseExportModule } from './modules/WarehouseExportModule';
import { WarehouseImportModule } from './modules/WarehouseImportModule';
import { CustomerModule } from './modules/CustomerModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFiles,
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    LegalPersonModule,
    PartnerModule,
    CustomerModule,
    ProductModule,
    WarehouseModule,
    OrderModule,
    WarehouseImportModule,
    WarehouseExportModule,
    VehicleModule,
    DriverModule,
  ],
})
export class AppModule { }

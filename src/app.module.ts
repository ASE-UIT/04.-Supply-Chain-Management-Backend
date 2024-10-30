import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseModule } from './modules/WarehouseModule';
import { ProductModule } from './modules/ProductModule';
import typeorm from './config/typeorm';
import { envFiles } from './config/env';
import { PartnerModule } from './modules/PartnerModule';

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
    PartnerModule,
    WarehouseModule,
    ProductModule,
  ],
})
export class AppModule { }

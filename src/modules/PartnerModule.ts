import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerService } from '../services/PartnerService';
import { PartnerController } from '../controllers/PartnerController';
import { Partner } from '../entities/partner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Partner])],
  controllers: [PartnerController],
  providers: [PartnerService],
})
export class PartnerModule {}

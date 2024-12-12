import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerService } from '../services/PartnerService';
import { PartnerController } from '../controllers/PartnerController';
import { Partner } from '../entities/partner.entity';
import { LegalPerson } from '@scm/entities/legal_person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Partner,
      LegalPerson,
    ])
  ],
  controllers: [PartnerController],
  providers: [PartnerService],
})
export class PartnerModule {}

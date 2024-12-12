import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegalPersonService } from '../services/LegalPersonService';
import { LegalPersonController } from '../controllers/LegalPersonController';
import { LegalPerson } from '../entities/legal_person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LegalPerson,
    ])
  ],
  controllers: [LegalPersonController],
  providers: [LegalPersonService],
})
export class LegalPersonModule {}

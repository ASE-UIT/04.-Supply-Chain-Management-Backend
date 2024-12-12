import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleService } from '../services/VehicleService';
import { VehicleController } from '../controllers/VehicleController';
import { Vehicle } from '../entities/vehicle.entity';
import { Partner } from '@scm/entities/partner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Vehicle,
      Partner,
    ])
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}

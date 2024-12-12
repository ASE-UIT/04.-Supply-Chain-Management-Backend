import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from '@scm/entities/vehicle.entity';
import { DriverController } from '../controllers/DriverController';
import { Driver } from '../entities/driver.entity';
import { DriverService } from '../services/DriverService';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Driver,
            Vehicle,
        ])
    ],
    controllers: [DriverController],
    providers: [DriverService],
})
export class DriverModule { }

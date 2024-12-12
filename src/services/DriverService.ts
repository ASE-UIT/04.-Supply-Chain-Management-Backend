import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageCode } from '@scm/commons/MessageCode';
import { ApplicationException } from '@scm/controllers/ExceptionController';
import { Driver_CreateDto } from '@scm/dtos/Driver_CreateDto';
import { Vehicle } from '@scm/entities/vehicle.entity';
import { Driver } from '@scm/entities/driver.entity'; // Adjust the import path according to your project structure
import { Repository } from 'typeorm';

@Injectable()
export class DriverService {
    constructor(
        @InjectRepository(Driver) private readonly driverModel: Repository<Driver>,
        @InjectRepository(Vehicle) private readonly vehicleModel: Repository<Vehicle>,
    ) { }

    async findAll(): Promise<Driver[]> {
        return await this.driverModel.find({ withDeleted: false });
    }

    async findById(id: number): Promise<Driver> {
        const driver = await this.driverModel.findOne({ where: { id }, withDeleted: false });
        if (!driver) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.LEGAL_PERSON_NOT_FOUND);
        }
        return driver;
    }

    async create(driver: Driver_CreateDto): Promise<Driver> {
        const vehicle = await this.vehicleModel.findOne({ where: { id: driver.vehicleId }, withDeleted: false });
        if (!vehicle) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PARTNER_NOT_FOUND);
        }

        return await this.driverModel.save({
            name: driver.name,
            phoneNumber: driver.phoneNumber,
            licenseNumber: driver.licenseNumber,
            licenseType: driver.licenseType,
            vehicle: vehicle,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async update(id: number, driver: Driver_CreateDto): Promise<Driver> {
        const driverToUpdate = await this.findById(id);
        if (!driverToUpdate) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.LEGAL_PERSON_NOT_FOUND);
        }

        if (driver.vehicleId) {
            const vehicle = await this.vehicleModel.findOne({ where: { id: driver.vehicleId }, withDeleted: false });
            if (!vehicle) {
                throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PARTNER_NOT_FOUND);
            }

            driverToUpdate.vehicle = vehicle;
        }

        driverToUpdate.name = driver.name;
        driverToUpdate.phoneNumber = driver.phoneNumber;
        driverToUpdate.licenseNumber = driver.licenseNumber;
        driverToUpdate.licenseType = driver.licenseType;
        driverToUpdate.updatedAt = new Date();

        return await this.driverModel.save(driverToUpdate);
    }

    async delete(id: number): Promise<void> {
        const driverToDelete = await this.findById(id);
        if (!driverToDelete) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.LEGAL_PERSON_NOT_FOUND);
        }

        await this.driverModel.softDelete(id);
    }
}

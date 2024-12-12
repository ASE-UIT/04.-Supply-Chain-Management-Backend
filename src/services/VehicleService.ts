import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageCode } from '@scm/commons/MessageCode';
import { ApplicationException } from '@scm/controllers/ExceptionController';
import { Vehicle_CreateDto } from '@scm/dtos/Vehicle_CreateDto';
import { Partner } from '@scm/entities/partner.entity';
import { Vehicle } from '@scm/entities/vehicle.entity'; // Adjust the import path according to your project structure
import { PartnerTypeEnum } from '@scm/enums/PartnerTypeEnum';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(Vehicle) private readonly vehicleModel: Repository<Vehicle>,
        @InjectRepository(Partner) private readonly partnerModel: Repository<Partner>,
    ) { }

    async findAll(): Promise<Vehicle[]> {
        return await this.vehicleModel.find({ withDeleted: false });
    }

    async findById(id: number): Promise<Vehicle> {
        const vehicle = await this.vehicleModel.findOne({ where: { id }, withDeleted: false });
        if (!vehicle) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.LEGAL_PERSON_NOT_FOUND);
        }
        return vehicle;
    }

    async create(vehicle: Vehicle_CreateDto): Promise<Vehicle> {
        const partner = await this.partnerModel.findOne({ where: { id: vehicle.partnerId }, withDeleted: false });
        if (!partner) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PARTNER_NOT_FOUND);
        }

        if (partner.type !== PartnerTypeEnum.PARTNER_DELIVER) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.INVALID_PARTNER_TYPE);
        }

        return await this.vehicleModel.save({
            licensePlate: vehicle.licensePlate,
            type: vehicle.type,
            status: vehicle.status,
            capacity: vehicle.capacity,
            availability: vehicle.availability,
            partner: partner,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async update(id: number, vehicle: Vehicle_CreateDto): Promise<Vehicle> {
        const vehicleToUpdate = await this.findById(id);
        if (!vehicleToUpdate) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.LEGAL_PERSON_NOT_FOUND);
        }

        if (vehicle.partnerId) {
            const partner = await this.partnerModel.findOne({ where: { id: vehicle.partnerId }, withDeleted: false });
            if (!partner) {
                throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PARTNER_NOT_FOUND);
            }

            if (partner.type !== PartnerTypeEnum.PARTNER_DELIVER) {
                throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.INVALID_PARTNER_TYPE);
            }

            vehicleToUpdate.partner = partner;
        }

        vehicleToUpdate.licensePlate = vehicle.licensePlate;
        vehicleToUpdate.type = vehicle.type;
        vehicleToUpdate.status = vehicle.status;
        vehicleToUpdate.capacity = vehicle.capacity;
        vehicleToUpdate.availability = vehicle.availability;

        vehicleToUpdate.updatedAt = new Date();

        return await this.vehicleModel.save(vehicleToUpdate);
    }

    async delete(id: number): Promise<void> {
        const vehicleToDelete = await this.findById(id);
        if (!vehicleToDelete) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.LEGAL_PERSON_NOT_FOUND);
        }

        await this.vehicleModel.softDelete(id);
    }
}

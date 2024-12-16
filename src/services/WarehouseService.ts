import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageCode } from '@scm/commons/MessageCode';
import { ApplicationException } from '@scm/controllers/ExceptionController';
import { Warehouse_CreateWarehouseDto } from '@scm/dtos/Warehouse_CreateWarehouseDto';
import { Partner } from '@scm/entities/partner.entity';
import { Warehouse } from '@scm/entities/warehouse.entity';
import { PartnerTypeEnum } from '@scm/enums/PartnerTypeEnum';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
    @InjectRepository(Partner) private readonly partnerRepository: Repository<Partner>,
  ) { }
  async create(
    createWarehouseDto: Warehouse_CreateWarehouseDto,
  ): Promise<any> {
    try {
      const partner = await this.partnerRepository.findOne({
        where: { id: createWarehouseDto.ownerId },
        withDeleted: false,
      });

      if (!partner) {
        throw new ApplicationException(
          HttpStatus.BAD_REQUEST,
          MessageCode.PARTNER_NOT_FOUND,
        );
      }

      if (partner.type !== PartnerTypeEnum.PARTNER_WAREHOUSE) {
        throw new ApplicationException(
          HttpStatus.BAD_REQUEST,
          MessageCode.INVALID_PARTNER_TYPE,
        );
      }

      const newWarehouseData: DeepPartial<Warehouse> = {
        name: createWarehouseDto.name,
        address: createWarehouseDto.address,
        type: createWarehouseDto.type,
        status: createWarehouseDto.status,
        capacity: createWarehouseDto.capacity,
        availability: createWarehouseDto.availability,
        currentCapacity: createWarehouseDto.capacity,
        partner: partner,
      };

      const savedWarehouse =
        await this.warehouseRepository.save(newWarehouseData);

      return savedWarehouse;
    } catch (e) {
      if (e instanceof ApplicationException) {
        throw e;
      }
      Logger.error('[Error] - ', e.message, null, null, true);
      throw new ApplicationException(
        HttpStatus.BAD_REQUEST,
        MessageCode.CANNOT_CREATE_WAREHOUSE,
      );
    }
  }

  async findAll() {
    return await this.warehouseRepository.find({ withDeleted: false });
  }

  async findById(id: number) {
    const warehoust = await this.warehouseRepository.findOne({ where: { id }, withDeleted: false });
    if (!warehoust) {
      return 'Warehouse not found';
    }
    return warehoust;
  }

  async delete(id: number) {
    const warehouse = await this.warehouseRepository.findOne({ where: { id }, withDeleted: false });
    if (!warehouse) {
      return 'Warehouse not found';
    }
    return this.warehouseRepository.softRemove(warehouse);
  }

  async update(id: number, updateWarehouseDto: Warehouse_CreateWarehouseDto) {
    try {
      const warehouse = await this.warehouseRepository.findOne({ where: { id }, withDeleted: false });
      if (!warehouse) {
        return 'Warehouse not found';
      }

      if (updateWarehouseDto.ownerId) {
        const partner = await this.partnerRepository.findOne({
          where: { id: updateWarehouseDto.ownerId },
          withDeleted: false,
        });
        if (!partner) {
          throw new ApplicationException(
            HttpStatus.BAD_REQUEST,
            MessageCode.PARTNER_NOT_FOUND,
          );
        }
        if (partner.type !== PartnerTypeEnum.PARTNER_WAREHOUSE) {
          throw new ApplicationException(
            HttpStatus.BAD_REQUEST,
            MessageCode.INVALID_PARTNER_TYPE,
          );
        }
        warehouse.partner = partner;
      }

      warehouse.name = updateWarehouseDto.name;
      warehouse.address = updateWarehouseDto.address;
      warehouse.type = updateWarehouseDto.type;
      warehouse.status = updateWarehouseDto.status;
      if (updateWarehouseDto.capacity) {
        if (updateWarehouseDto.capacity < warehouse.currentCapacity) {
          throw new ApplicationException(
            HttpStatus.BAD_REQUEST,
            MessageCode.CANNOT_UPDATE_WAREHOUSE_CAPACITY,
          );
        }
        warehouse.currentCapacity -= warehouse.capacity - updateWarehouseDto.capacity;
        warehouse.capacity = updateWarehouseDto.capacity;
      }
      warehouse.availability = updateWarehouseDto.availability;
      return this.warehouseRepository.save(warehouse);
    } catch (e) {
      if (e instanceof ApplicationException) {
        throw e;
      }
      Logger.error('[Error] - ', e.message, null, null, true);
      throw new ApplicationException(
        HttpStatus.BAD_REQUEST,
        MessageCode.UNKNOWN_ERROR,
      );
    }
  }
}

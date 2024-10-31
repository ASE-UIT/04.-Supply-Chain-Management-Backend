import { MessageCode } from '@scm/commons/MessageCode';
import { ApplicationException } from '@scm/controllers/ExceptionController';
import { Warehouse_CreateWarehouseDto } from '@scm/dtos/Warehouse_CreateWarehouseDto';
import { Warehouse } from '@scm/entities/warehouse.entity';
import { HttpCode, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
  ) { }
  async create(
    createWarehouseDto: Warehouse_CreateWarehouseDto,
  ): Promise<any> {
    try {
      const requiredFields = [
        'name',
        'address',
        'type',
        'status',
        'capacity',
        'availability',
      ];
      for (const field of requiredFields) {
        if (!createWarehouseDto.hasOwnProperty(field)) {
          throw new ApplicationException(
            HttpStatus.BAD_REQUEST,
            MessageCode.PLEASE_FILL_ALL_REQUIRED_FIELDS,
          );
        }
      }

      const newWarehouseData: DeepPartial<Warehouse> = {
        name: createWarehouseDto.name,
        address: createWarehouseDto.address,
        type: createWarehouseDto.type,
        status: createWarehouseDto.status,
        capacity: createWarehouseDto.capacity,
        availability: createWarehouseDto.availability,
      };

      const savedWarehouse =
        await this.warehouseRepository.save(newWarehouseData);

      return savedWarehouse;
    } catch (e) {
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
      warehouse.name = updateWarehouseDto.name;
      warehouse.address = updateWarehouseDto.address;
      warehouse.type = updateWarehouseDto.type;
      warehouse.status = updateWarehouseDto.status;
      warehouse.capacity = updateWarehouseDto.capacity;
      warehouse.availability = updateWarehouseDto.availability;
      return this.warehouseRepository.save(warehouse);
    } catch (e) {
      Logger.error('[Error] - ', e.message, null, null, true);
      throw new ApplicationException(
        HttpStatus.BAD_REQUEST,
        MessageCode.UNKNOWN_ERROR,
      );
    }
  }
}

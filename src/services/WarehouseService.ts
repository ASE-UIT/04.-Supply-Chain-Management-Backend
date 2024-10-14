import { MessageCode } from '@gstb/commons/MessageCode';
import { ApplicationException } from '@gstb/controllers/ExceptionController';
import { Warehouse_CreateWarehouseDto } from '@gstb/dtos/Warehouse_CreateWarehouseDto';
import { Warehouse } from '@gstb/entities/warehouse.entity';
import { HttpCode, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
  ) {}
  async createWarehouse(
    createWarehouseDto: Warehouse_CreateWarehouseDto,
  ): Promise<any> {
    try {
      const requiredFields = [
        'name',
        'ownerId',
        'address',
        'type',
        'status',
        'capacity',
        'availability',
      ];
      for (const field of requiredFields) {
        if (!createWarehouseDto[field]) {
          throw new ApplicationException(
            HttpStatus.BAD_REQUEST,
            MessageCode.PLEASE_FILL_ALL_REQUIRED_FIELDS,
          );
        }
      }

      const existingWarehouse = await this.warehouseRepository.findOne({
        where: { name: createWarehouseDto.name },
      });
      if (existingWarehouse) {
        throw new ApplicationException(
          HttpStatus.BAD_REQUEST,
          MessageCode.WAREHOUSE_ALREADY_EXISTED,
        );
      }

      const newWarehouseData: DeepPartial<Warehouse> = {
        name: createWarehouseDto.name,
        ownerId: createWarehouseDto.ownerId,
        address: createWarehouseDto.address,
        type: createWarehouseDto.type,
        status: createWarehouseDto.status,
        capacity: createWarehouseDto.capacity,
        availability: createWarehouseDto.availability,
      };

      const savedWarehouse =
        await this.warehouseRepository.save(newWarehouseData);

      return {
        message: 'Tạo thành công thông tin kho',
        data: savedWarehouse,
      };
    } catch (e) {
      Logger.error('[Error] - ', e.message, null, null, true);
      throw new ApplicationException(
        HttpStatus.BAD_REQUEST,
        MessageCode.CANNOT_CREATE_WAREHOUSE,
      );
    }
  }
}
import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

import { Warehouse_CreateWarehouseDto } from '@gstb/dtos/Warehouse_CreateWarehouseDto'; // Điều chỉnh đường dẫn cho phù hợp
import { WarehouseService } from '@gstb/services/WarehouseService';
import { MessageCode } from '@gstb/commons/MessageCode';

@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  async createWarehouse(
    @Body() createWarehouseDto: Warehouse_CreateWarehouseDto,
    @Res() response: Response,
  ) {
    try {
      const result =
        await this.warehouseService.createWarehouse(createWarehouseDto);
      return response.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return response
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          message: error.message || MessageCode.CANNOT_CREATE_WAREHOUSE,
        });
    }
  }
}


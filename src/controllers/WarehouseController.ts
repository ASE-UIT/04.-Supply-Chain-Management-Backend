import { Controller, Post, Body, HttpStatus, Res, Get, Delete, Param } from '@nestjs/common';
import { Response } from 'express';
import { Logger } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Warehouse_CreateWarehouseDto } from '@gstb/dtos/Warehouse_CreateWarehouseDto'; // Điều chỉnh đường dẫn cho phù hợp
import { WarehouseService } from '@gstb/services/WarehouseService';
import { MessageCode } from '@gstb/commons/MessageCode';

@ApiTags('warehouse')
@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) { }

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

  @Get('/list')
  @ApiOperation({ summary: 'Get all warehouses' })
  @ApiResponse({ status: 200, description: 'Return all warehouses.' })
  @ApiResponse({ status: 404, description: 'No warehouses found' })
  async findAll() {
    Logger.log('WarehouseController:findAll');
    return this.warehouseService.findAll();
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Soft delete a warehouse' })
  @ApiResponse({ status: 200, description: 'Warehouse has been soft deleted' })
  @ApiResponse({ status: 404, description: 'Warehouse not found' })
  async removeWarehouse(@Param('id') id: string) {
    const warehouse = await this.warehouseService.findOne(parseInt(id));
    if (!warehouse) {
      return 'Warehouse not found';
    }
    return this.warehouseService.remove(parseInt(id));
  }
}






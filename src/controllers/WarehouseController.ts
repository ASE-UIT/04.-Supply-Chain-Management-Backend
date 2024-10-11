import { Controller, Post, Get, Param, Delete} from "@nestjs/common";
import { WarehouseService } from "../services/WarehouseService";
import { Logger } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('warehouse')
@Controller('warehouse')
export class WarehouseController {
    constructor(private readonly warehouseService: WarehouseService) { }

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



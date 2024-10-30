import { Warehouse_CreateWarehouseDto } from '@scm/dtos/Warehouse_CreateWarehouseDto'; // Điều chỉnh đường dẫn cho phù hợp
import { WarehouseService } from '@scm/services/WarehouseService';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('warehouse')
@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) { }

  @Get('/list')
  async getAll(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.warehouseService.findAll());
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.warehouseService.findById(id));
  }

  @Post('/')
  async create(@Body() warehouse: Warehouse_CreateWarehouseDto, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.warehouseService.create(warehouse));
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() warehouse: Warehouse_CreateWarehouseDto, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.warehouseService.update(id, warehouse));
  }

  @Delete('/:id')
  async delete(@Param('id') id: number, @Req() req, @Res() res) {
    await this.warehouseService.delete(id);
    return res.status(HttpStatus.OK).json({ message: 'Warehouse deleted successfully' });
  }
}






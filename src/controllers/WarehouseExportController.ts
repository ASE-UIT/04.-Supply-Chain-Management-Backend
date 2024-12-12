import { WarehouseExportService } from '@scm/services/WarehouseExportService';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Warehouse_ExportItemsDto } from '@scm/dtos/Warehouse_ExportItemsDto';
import { Warehouse_CreateExportOrderDto } from '@scm/dtos/Warehouse_CreateExportOrderDto';
import { Warehouse_UpdateExportOrderDto } from '@scm/dtos/Warehouse_UpdateExportOrderDto';
import { WarehouseExportOrder } from '@scm/entities/warehouse_export_order.entity';
import { Warehouse } from '@scm/entities/warehouse.entity';

@ApiTags('warehouse-export')
@Controller('warehouses-export')
export class WarehouseExportController {
  constructor(private readonly warehouseExportService: WarehouseExportService) { }

  @Get('/list')
  async getAll(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.warehouseExportService.findAll());
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.warehouseExportService.findById(id));
  }

  @Post('/')
  async create(@Body() WarehouseExportOrder: Warehouse_CreateExportOrderDto, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.warehouseExportService.create(WarehouseExportOrder));
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() WarehouseExportOrder: Warehouse_UpdateExportOrderDto, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.warehouseExportService.update(id, WarehouseExportOrder));
  }

  @Put('/status/id')
  async approve(@Body() status: string, @Param('id') id: number, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.warehouseExportService.updateStatus(id, status));
  }

  @Delete('/:id')
  async delete(@Param('id') id: number, @Req() req, @Res() res) {
    await this.warehouseExportService.delete(id);
    return res.status(HttpStatus.OK).json({ message: 'Export order deleted successfully' });
  }

  @Get('/:id/export_order')
  async getExportOrder(@Param('id') id: number, @Res() res) {
    try {
      const rawText = await this.warehouseExportService.exportOrder(id);
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', 'attachment; filename="export_order_${id}.txt"');
      res.status(HttpStatus.OK).send(rawText);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}






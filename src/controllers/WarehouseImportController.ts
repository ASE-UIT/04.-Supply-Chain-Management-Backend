import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Warehouse_ImportProductsDto } from '@scm/dtos/Warehouse_ImportProductsDto';
import { WarehouseImportService } from '@scm/services/WarehouseImportService';

@ApiTags('warehouse-import')
@Controller('warehouses-import')
export class WarehouseImportController {
    constructor(private readonly warehouseImportService: WarehouseImportService) { }

    @Get('/list')
    async getAll(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.warehouseImportService.listWarehouseImports());
    }

    @Get('/:id')
    async getById(@Param('id') id: number, @Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.warehouseImportService.getWarehouseImportById(id));
    }

    @Post('/')
    async create(@Body() dto: Warehouse_ImportProductsDto, @Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.warehouseImportService.importProducts(dto));
    }

    @Post('/:id/approve')
    async approveWarehouseImport(@Param('id') id: number, @Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.warehouseImportService.approveWarehouseImport(id));
    }
}






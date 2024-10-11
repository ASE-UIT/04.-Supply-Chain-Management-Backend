import { Controller, Post, Get, Param, Delete} from "@nestjs/common";
import { WarehouseService } from "../services/WarehouseService";

@Controller('warehouse')
export class WarehouseController {
    constructor(private readonly warehouseService: WarehouseService) { }

    @Get(':list')
    async findAll() {
        return this.warehouseService.findAll();
    }

    @Delete('/:id')
    async removeWarehouse(@Param('id') id: string) {
        return this.warehouseService.remove(Number(id));
    }
}



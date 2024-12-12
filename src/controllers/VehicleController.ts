// src/controllers/vehicle.controller.ts
import { Vehicle_CreateDto } from '@scm/dtos/Vehicle_CreateDto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { VehicleService } from '../services/VehicleService';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) { }

    @Get('/list')
    async getAll(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.vehicleService.findAll());
    }

    @Get('/:id')
    async getById(@Param('id') id: number, @Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.vehicleService.findById(id));
    }

    @Post('/')
    @ApiOperation({ description: "Tạo vehicle trước khi tạo driver" })
    async create(@Body() vehicle: Vehicle_CreateDto, @Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.vehicleService.create(vehicle));
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() vehicle: Vehicle_CreateDto, @Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.vehicleService.update(id, vehicle));
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @Req() req, @Res() res) {
        await this.vehicleService.delete(id);
        return res.status(HttpStatus.OK).json({ message: 'Vehicle deleted successfully' });
    }
}

// src/controllers/driver.controller.ts
import { Driver_CreateDto } from '@scm/dtos/Driver_CreateDto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { DriverService } from '../services/DriverService';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('drivers')
@Controller('drivers')
export class DriverController {
    constructor(private readonly driverService: DriverService) { }

    @Get('/list')
    async getAll(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.driverService.findAll());
    }

    @Get('/:id')
    async getById(@Param('id') id: number, @Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.driverService.findById(id));
    }

    @Post('/')
    @ApiOperation({ description: "Tạo vehicle trước khi tạo driver" })
    async create(@Body() driver: Driver_CreateDto, @Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.driverService.create(driver));
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() driver: Driver_CreateDto, @Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.driverService.update(id, driver));
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @Req() req, @Res() res) {
        await this.driverService.delete(id);
        return res.status(HttpStatus.OK).json({ message: 'Driver deleted successfully' });
    }
}

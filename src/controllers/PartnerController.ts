// src/controllers/partner.controller.ts
import { Partner_CreateDto } from '@scm/dtos/Partner_CreateDto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { PartnerService } from '../services/PartnerService';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('partners')
@Controller('partners')
export class PartnerController {
    constructor(private readonly partnerService: PartnerService) { }

    @Get('/list')
    async getAll(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.partnerService.findAll());
    }

    @Get('/:id')
    async getById(@Param('id') id: number, @Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.partnerService.findById(id));
    }

    @Post('/')
    async create(@Body() partner: Partner_CreateDto, @Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.partnerService.create(partner));
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() partner: Partner_CreateDto, @Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(await this.partnerService.update(id, partner));
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @Req() req, @Res() res) {
        await this.partnerService.delete(id);
        return res.status(HttpStatus.OK).json({ message: 'Partner deleted successfully' });
    }
}

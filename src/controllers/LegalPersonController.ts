// src/controllers/legalPerson.controller.ts
import { LegalPerson_CreateDto } from '@scm/dtos/LegalPerson_CreateDto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { LegalPersonService } from '../services/LegalPersonService';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('legal-persons')
@Controller('legal-persons')
export class LegalPersonController {
  constructor(private readonly legalPersonService: LegalPersonService) { }

  @Get('/list')
  async getAll(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.legalPersonService.findAll());
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.legalPersonService.findById(id));
  }

  @Post('/')
  async create(@Body() legalPerson: LegalPerson_CreateDto, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.legalPersonService.create(legalPerson));
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() legalPerson: LegalPerson_CreateDto, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.legalPersonService.update(id, legalPerson));
  }

  @Delete('/:id')
  async delete(@Param('id') id: number, @Req() req, @Res() res) {
    await this.legalPersonService.delete(id);
    return res.status(HttpStatus.OK).json({ message: 'LegalPerson deleted successfully' });
  }
}

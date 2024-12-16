// src/controllers/customer.controller.ts
import { Customer_CreateDto } from '@scm/dtos/Customer_CreateDto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { CustomerService } from '../services/CustomerService';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Get('/list')
  async getAll(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.customerService.findAll());
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.customerService.findById(id));
  }

  @Post('/')
  async create(@Body() customer: Customer_CreateDto, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.customerService.create(customer));
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() customer: Customer_CreateDto, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.customerService.update(id, customer));
  }

  @Delete('/:id')
  async delete(@Param('id') id: number, @Req() req, @Res() res) {
    await this.customerService.delete(id);
    return res.status(HttpStatus.OK).json({ message: 'Customer deleted successfully' });
  }
}

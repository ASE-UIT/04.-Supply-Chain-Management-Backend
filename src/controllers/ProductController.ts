// src/controllers/product.controller.ts
import { Product_CreateDto } from '@gstb/dtos/Product_CreateDto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ProductService } from '../services/ProductService';
import { Product_UpdateDto } from '@gstb/dtos/Product_UpdateDto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('/list')
  async getAll(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.productService.findAll());
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.productService.findById(id));
  }

  @Post('/')
  async create(@Body() product: Product_CreateDto, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.productService.create(product));
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() product: Product_UpdateDto, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.productService.update(id, product));
  }

  @Delete('/:id')
  async delete(@Param('id') id: number, @Req() req, @Res() res) {
    await this.productService.delete(id);
    return res.status(HttpStatus.OK).json({ message: 'Product deleted successfully' });
  }
}

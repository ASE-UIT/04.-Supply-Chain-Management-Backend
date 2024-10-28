// src/controllers/product.controller.ts
import { Controller, Get, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from '../services/ProductService';
import { Product } from '../entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  // Get all products
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.viewProductList();
  }

  // Delete a product by ID
  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<string> {
    try {
      await this.productService.deleteProduct(id);
      return `Product with ID ${id} has been deleted.`;
    } catch (error) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }
}

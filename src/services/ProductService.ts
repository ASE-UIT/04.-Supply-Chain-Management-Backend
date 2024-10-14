// src/services/product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Method to get all products
  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['partner'] });
  }

  // Method to delete a product by ID
  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}

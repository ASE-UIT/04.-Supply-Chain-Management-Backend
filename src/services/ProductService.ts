import { MessageCode } from '@gstb/commons/MessageCode';
import { ApplicationException } from '@gstb/controllers/ExceptionController';
import { Product_CreateDto } from '@gstb/dtos/Product_CreateDto';
import { Product_UpdateDto } from '@gstb/dtos/Product_UpdateDto';
import { Product } from '@gstb/entities/product.entity'; // Adjust the import path according to your project structure
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productModel: Repository<Product>,
  ) { }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find({ withDeleted: false });
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productModel.findOne({ where: { id }, withDeleted: false });
    if (!product) {
      throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PRODUCT_NOT_FOUND);
    }
    return product;
  }

  async create(product: Product_CreateDto): Promise<Product> {
    return await this.productModel.save({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async update(id: number, product: Product_UpdateDto): Promise<Product> {
    const productToUpdate = await this.findById(id);
    if (!productToUpdate) {
      throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PRODUCT_NOT_FOUND);
    }

    productToUpdate.name = product.name;
    productToUpdate.quantity = product.quantity;
    productToUpdate.unit = product.unit;
    productToUpdate.status = product.status;
    productToUpdate.type = product.type;
    productToUpdate.size = product.size;
    productToUpdate.weight = product.weight;
    productToUpdate.updatedAt = new Date();

    return await this.productModel.save(productToUpdate);
  }

  async delete(id: number): Promise<void> {
    const productToDelete = await this.findById(id);
    if (!productToDelete) {
      throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PRODUCT_NOT_FOUND);
    }

    await this.productModel.softDelete(id);
  }
}

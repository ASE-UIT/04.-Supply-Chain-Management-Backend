import { MessageCode } from '@scm/commons/MessageCode';
import { ApplicationException } from '@scm/controllers/ExceptionController';
import { Product_CreateDto } from '@scm/dtos/Product_CreateDto';
import { Product_UpdateDto } from '@scm/dtos/Product_UpdateDto';
import { Product } from '@scm/entities/product.entity'; // Adjust the import path according to your project structure
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from '@scm/entities/partner.entity';
import { PartnerTypeEnum } from '@scm/enums/PartnerTypeEnum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productModel: Repository<Product>,
    @InjectRepository(Partner) private readonly partnerModel: Repository<Partner>,
  ) { }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find({ withDeleted: false, relations: ['partner'] });
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productModel.findOne({ where: { id }, withDeleted: false });
    if (!product) {
      throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PRODUCT_NOT_FOUND);
    }
    return product;
  }

  async create(product: Product_CreateDto): Promise<Product> {
    const partner = await this.partnerModel.findOne({ where: { id: product.ownerId }, withDeleted: false });
    if (!partner) {
      throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PARTNER_NOT_FOUND);
    }

    if (partner.type !== PartnerTypeEnum.PARTNER_SUPPLIER) {
      throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.INVALID_PARTNER_TYPE);
    }

    return await this.productModel.save({
      name: product.name,
      unit: product.unit,
      status: product.status,
      unitPrice: product.unitPrice,
      type: product.type,
      size: product.size,
      weight: product.weight,
      partner: partner,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async update(id: number, product: Product_UpdateDto): Promise<Product> {
    const productToUpdate = await this.findById(id);
    if (!productToUpdate) {
      throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PRODUCT_NOT_FOUND);
    }

    if (product.ownerId) {
      const partner = await this.partnerModel.findOne({ where: { id: product.ownerId }, withDeleted: false });
      if (!partner) {
        throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PARTNER_NOT_FOUND);
      }

      if (partner.type !== PartnerTypeEnum.PARTNER_SUPPLIER) {
        throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.INVALID_PARTNER_TYPE);
      }
      productToUpdate.partner = partner;
    }

    productToUpdate.name = product.name;
    productToUpdate.unit = product.unit;
    productToUpdate.unitPrice = product.unitPrice;
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

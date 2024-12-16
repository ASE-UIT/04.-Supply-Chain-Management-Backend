import { MessageCode } from '@scm/commons/MessageCode';
import { ApplicationException } from '@scm/controllers/ExceptionController';
import { Warehouse_ExportProductsDto } from '@scm/dtos/Warehouse_ExportProductsDto';

import { Warehouse } from '@scm/entities/warehouse.entity';
import { WarehouseExportItem } from '@scm/entities/warehouse_export_item.entity';
import { WarehouseExportOrder } from '@scm/entities/warehouse_export_order.entity';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from '@scm/entities/partner.entity';
import { Product } from '@scm/entities/product.entity';
import { User } from '@scm/entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class WarehouseExportService {
  constructor(
    @InjectRepository(WarehouseExportOrder) private readonly warehouseExportRepository: Repository<WarehouseExportOrder>,
    @InjectRepository(WarehouseExportItem) private readonly warehouseExportItemRepository: Repository<WarehouseExportItem>,
    @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
    @InjectRepository(Partner) private readonly partnerRepository: Repository<Partner>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) { }

  async create(
    dto: Warehouse_ExportProductsDto,
  ): Promise<any> {
    try {
      const warehouse = await this.warehouseRepository.findOne({
        where: { id: dto.warehouseId },
        withDeleted: false,
      });

      if (!warehouse) {
        throw new ApplicationException(
          HttpStatus.BAD_REQUEST,
          MessageCode.WAREHOUSE_NOT_FOUND,
        );
      }

      const createdBy = await this.userRepository.findOne({
        withDeleted: false,
      });

      if (!createdBy) {
        throw new ApplicationException(
          HttpStatus.BAD_REQUEST,
          MessageCode.PARTNER_NOT_FOUND,
        );
      }

      const { items: warehouseExportItems, ...data } = dto;

      // Tạo export order 
      const newWarehouseExportOrderData: DeepPartial<WarehouseExportOrder> = {
        name: data.name,
        status: data.status,
        exportDate: data.exportDate,
        items: [],
        warehouse: warehouse,
        createdBy: createdBy,
      };

      const warehouseExportEntity = await this.warehouseExportRepository.save(newWarehouseExportOrderData);

      for (const item of warehouseExportItems) {
        const product = await this.productRepository.findOne({ where: { id: item.productId }, withDeleted: false });

        if (!product) {
          throw new ApplicationException(
            HttpStatus.BAD_REQUEST,
            MessageCode.PRODUCT_NOT_FOUND,
          );
        }

        const warehouseETE = await this.warehouseExportItemRepository.create({
          unitPrice: item.unitPrice,
          quantityDocument: item.quantityDocument,
          quantityActual: item.quantityActual,
          order: warehouseExportEntity,
          product: product,
        });

        await this.warehouseExportItemRepository.save(warehouseETE);
      }

      return warehouseExportEntity;
    } catch (e) {
      if (e instanceof ApplicationException) {
        throw e;
      }
      Logger.error('[Error] - ', e.message, null, null, true);
      throw new ApplicationException(
        HttpStatus.BAD_REQUEST,
        MessageCode.CANNOT_CREATE_WAREHOUSE_EXPORT_ORDER,
      );
    }
  }

  async findAll() {
    return await this.warehouseExportRepository.find({ withDeleted: false });
  }

  async findById(id: number) {
    const warehouse_export = await this.warehouseExportRepository.findOne({ where: { id }, withDeleted: false });
    if (!warehouse_export) {
      throw new ApplicationException(
        HttpStatus.BAD_REQUEST,
        MessageCode.WAREHOUSE_EXPORT_ORDER_NOT_FOUND,
      );
    }
    return warehouse_export;
  }

  async delete(id: number) {
    const warehouse_export = await this.warehouseExportRepository.findOne({ where: { id }, withDeleted: false });
    if (!warehouse_export) {
      throw new ApplicationException(
        HttpStatus.BAD_REQUEST,
        MessageCode.WAREHOUSE_EXPORT_ORDER_NOT_FOUND,
      );
    }
    return this.warehouseRepository.softDelete(id);
  }

  async update(id: number, updateDto: Partial<Warehouse_ExportProductsDto>,
  ): Promise<WarehouseExportOrder> {
    try {
      const warehouse_export = await this.warehouseExportRepository.findOne({
        where: { id },
        relations: ['items'],
        withDeleted: false
      });

      if (!warehouse_export) {
        throw new ApplicationException(
          HttpStatus.BAD_REQUEST,
          MessageCode.WAREHOUSE_EXPORT_ORDER_NOT_FOUND,
        );
      }

      // Cập nhật các trường
      if (updateDto.name) {
        warehouse_export.name = updateDto.name;
      }

      if (updateDto.status) {
        warehouse_export.status = updateDto.status;
      }

      warehouse_export.updatedAt = new Date();

      return await this.warehouseExportRepository.save(warehouse_export);
    } catch (e) {
      Logger.error('[Error] - ', e.message, null, null, true);
      throw new ApplicationException(
        HttpStatus.BAD_REQUEST,
        MessageCode.CANNOT_UPDATE_WAREHOUSE_EXPORT_ORDER,
      );
    }
  }

  async exportOrder(id: number): Promise<string> {
    try {
      const warehouseExportOrder = await this.warehouseExportRepository.findOne({
        where: { id },
        relations: ['items', 'fromWarehouse', 'toWarehouse', 'createdBy', 'approvedBy'],
      });

      if (!warehouseExportOrder) {
        throw new ApplicationException(
          HttpStatus.NOT_FOUND,
          MessageCode.WAREHOUSE_EXPORT_ORDER_NOT_FOUND,
        );
      }

      let rawText = `Warehouse Export Order ID: ${warehouseExportOrder.id}\n`;
      rawText += `Name: ${warehouseExportOrder.name}\n`;
      rawText += `Status: ${warehouseExportOrder.status}\n`;
      rawText += `Created By: ${warehouseExportOrder.createdBy.name}\n`;
      rawText += `Approved By: ${warehouseExportOrder.approvedBy ? warehouseExportOrder.approvedBy.name : 'N/A'}\n`;
      rawText += `Created At: ${warehouseExportOrder.createdAt.toISOString()}\n`;
      rawText += `Approved At: ${warehouseExportOrder.updatedAt ? warehouseExportOrder.updatedAt.toISOString() : 'N/A'}\n\n`;

      warehouseExportOrder.items.forEach((item) => {
        rawText += `Item: ${item.product.name}\n`;
        rawText += `Lot Number: ${item.product.id}\n`;
        rawText += `Price: ${item.unitPrice}\n`;
        rawText += `Quantity (Document): ${item.quantityDocument}\n`;
        rawText += `Quantity (Actual): ${item.quantityActual}\n`;
        rawText += `Total Amount: ${item.quantityActual * item.unitPrice}\n\n`;
      });

      return rawText;
    } catch (error) {
      throw new ApplicationException(HttpStatus.INTERNAL_SERVER_ERROR, 'Error generating raw text');
    }
  }

}


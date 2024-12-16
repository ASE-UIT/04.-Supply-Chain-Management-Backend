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
import { WarehouseProduct } from '@scm/entities/warehouse_product.entity';
import { Order } from '@scm/entities/order.entity';
import { WarehouseDocumentStatusEnum } from '@scm/enums/WarehouseDocumentEnum';

@Injectable()
export class WarehouseExportService {
  constructor(
    @InjectRepository(WarehouseExportOrder) private readonly warehouseExportRepository: Repository<WarehouseExportOrder>,
    @InjectRepository(WarehouseExportItem) private readonly warehouseExportItemRepository: Repository<WarehouseExportItem>,
    @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
    @InjectRepository(Partner) private readonly partnerRepository: Repository<Partner>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(WarehouseProduct) private readonly warehouseProductRepository: Repository<WarehouseProduct>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
  ) { }

  async createFromOrder(orderId: number): Promise<any> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['items', 'customer', 'items.product', 'items.product.product', 'items.product.warehouse'],
    });

    if (!order) {
      throw new ApplicationException(
        HttpStatus.BAD_REQUEST,
        MessageCode.ORDER_NOT_FOUND,
      );
    }

    if (order.status !== 'CONFIRMED') {
      throw new ApplicationException(
        HttpStatus.BAD_REQUEST,
        MessageCode.ORDER_STATUS_INVALID,
      );
    }

    const dto: Warehouse_ExportProductsDto = {
      name: `PXK-${order.id}`,
      warehouseId: null,
      exportDate: new Date(),
      status: WarehouseDocumentStatusEnum.DRAFT,
      items: [],
    }

    let data = {};

    for (const item of order.items) {
      data[item.product.warehouse.id] = [
        ...(data ? (data[item.product.warehouse.id] || []) : []),
        {
          productId: item.product.product.id,
          quantityDocument: item.quantity,
          quantityActual: item.quantity,
        },
      ];
    }

    for (const warehouseId in data) {
      const newDto: Warehouse_ExportProductsDto = {
        ...dto,
        warehouseId: parseInt(warehouseId),
        name: `${dto.name}-${warehouseId}`,
        items: data[warehouseId]
      };

      await this.create(newDto);
    }

    return { message: 'Create warehouse export order successfully' };
  }

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
        where: {},
        withDeleted: false,
      });

      // if (!createdBy) {
      //   throw new ApplicationException(
      //     HttpStatus.BAD_REQUEST,
      //     MessageCode.PARTNER_NOT_FOUND,
      //   );
      // }

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

        // const warehouseProduct = await this.warehouseProductRepository.findOne({
        //   relations: ['product', 'warehouse'],
        //   where: { warehouse, product },
        //   withDeleted: false,
        // });

        // if (!warehouseProduct) {
        //   throw new ApplicationException(
        //     HttpStatus.BAD_REQUEST,
        //     MessageCode.PRODUCT_NOT_FOUND,
        //   );
        // }

        // if (warehouseProduct.amount < item.quantityActual) {
        //   throw new ApplicationException(
        //     HttpStatus.BAD_REQUEST,
        //     MessageCode.WAREHOUSE_EXPORT_ITEM_QUANTITY_INVALID,
        //   );
        // }

        // warehouseProduct.amount -= item.quantityActual;

        const warehouseETE = await this.warehouseExportItemRepository.create({
          unitPrice: product.unitPrice,
          quantityDocument: item.quantityDocument,
          quantityActual: item.quantityActual,
          order: warehouseExportEntity,
          product: product,
        });

        // await this.warehouseProductRepository.save(warehouseProduct);
        warehouseExportEntity.items.push(await this.warehouseExportItemRepository.save(warehouseETE));
      }

      return await this.warehouseExportRepository.save(warehouseExportEntity);
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

  async approveExport(id: number): Promise<WarehouseExportOrder> {
    try {
      const warehouseExport = await this.warehouseExportRepository.findOne({
        where: { id },
        relations: ['items', 'warehouse', 'items.product'],
        withDeleted: false
      });

      if (!warehouseExport) {
        throw new ApplicationException(
          HttpStatus.BAD_REQUEST,
          MessageCode.WAREHOUSE_EXPORT_ORDER_NOT_FOUND,
        );
      }

      if (warehouseExport.status !== WarehouseDocumentStatusEnum.DRAFT) {
        throw new ApplicationException(
          HttpStatus.BAD_REQUEST,
          MessageCode.WAREHOUSE_EXPORT_ORDER_STATUS_INVALID,
        );
      }

      for (const item of warehouseExport.items) {
        const warehouseProduct = await this.warehouseProductRepository.createQueryBuilder('warehouse_product')
          .where('warehouse_product."warehouseId" = :warehouseId', { warehouseId: warehouseExport.warehouse.id })
          .andWhere('warehouse_product."productId" = :productId', { productId: item.product.id })
          .andWhere('warehouse_product."deletedAt" IS NULL')
          .getOne();

        if (!warehouseProduct) {
          throw new ApplicationException(
            HttpStatus.BAD_REQUEST,
            MessageCode.PRODUCT_NOT_FOUND,
          );
        }

        if (warehouseProduct.amount < item.quantityActual) {
          throw new ApplicationException(
            HttpStatus.BAD_REQUEST,
            MessageCode.WAREHOUSE_EXPORT_ITEM_QUANTITY_INVALID,
          );
        }

        warehouseProduct.amount -= item.quantityActual;
        await this.warehouseProductRepository.save(warehouseProduct);
      }
      warehouseExport.status = WarehouseDocumentStatusEnum.APPROVED;
      warehouseExport.updatedAt = new Date();

      return await this.warehouseExportRepository.save(warehouseExport);
    } catch (e) {
      if (e instanceof ApplicationException) {
        throw e;
      }
      Logger.error('[Error] - ', e.message, null, null, true);
      throw new ApplicationException(
        HttpStatus.BAD_REQUEST,
        MessageCode.CANNOT_APPROVE_WAREHOUSE_EXPORT_ORDER,
      );
    }
  }

  async findAll() {
    return await this.warehouseExportRepository.find({ withDeleted: false, relations: ['items', 'warehouse', 'items.product'] });
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


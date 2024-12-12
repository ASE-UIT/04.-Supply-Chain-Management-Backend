import { MessageCode } from '@scm/commons/MessageCode';
import { ApplicationException } from '@scm/controllers/ExceptionController';
import { Warehouse_CreateExportOrderDto } from '@scm/dtos/Warehouse_CreateExportOrderDto';

import { Warehouse } from '@scm/entities/warehouse.entity';
import { WarehouseExportOrder } from '@scm/entities/warehouse_export_order.entity';
import { WarehouseExportItem } from '@scm/entities/warehouse_export_item.entity';

import { HttpCode, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Partner } from '@scm/entities/partner.entity';
import { PartnerTypeEnum } from '@scm/enums/PartnerTypeEnum';
import { Warehouse_UpdateExportOrderDto } from '@scm/dtos/Warehouse_UpdateExportOrderDto';
import { Warehouse_ExportItemsDto } from '@scm/dtos/Warehouse_ExportItemsDto';

@Injectable()
export class WarehouseExportService {
  constructor(
    @InjectRepository(WarehouseExportOrder) private readonly warehouseExportRepository: Repository<WarehouseExportOrder>,
    @InjectRepository(WarehouseExportItem) private readonly warehouseExportItemRepository: Repository<WarehouseExportItem>,
    @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
    @InjectRepository(Partner) private readonly partnerRepository: Repository<Partner>,
  ) { }

  async create(
    createWarehouseExportOrderDto: Warehouse_CreateExportOrderDto,
  ): Promise<any> {
    try {
      const fromWarehouse = await this.warehouseExportRepository.findOne({
        where: { id: createWarehouseExportOrderDto.fromWarehouse},
        withDeleted: false,
      });

      if (!fromWarehouse) {
        throw new ApplicationException(
          HttpStatus.BAD_REQUEST,
          MessageCode.WAREHOUSE_NOT_FOUND,
        );
      }

      const toWarehouse = await this.warehouseRepository.findOne({
        where: { id: createWarehouseExportOrderDto.toWarehouse},
        withDeleted: false,
      });

      if (!toWarehouse) {
        throw new ApplicationException(
          HttpStatus.BAD_REQUEST,
          MessageCode.WAREHOUSE_NOT_FOUND,
        );
      }

      const createdBy = await this.partnerRepository.findOne({
        where: { id: createWarehouseExportOrderDto.createdBy },
        withDeleted: false,
      });

      if (!createdBy) {
        throw new ApplicationException(
          HttpStatus.BAD_REQUEST,
          MessageCode.PARTNER_NOT_FOUND,
        );
      }
      // Tạo export order 
      const newWarehouseExportOrderData: DeepPartial<WarehouseExportOrder> = {
        name: createWarehouseExportOrderDto.name,
        type: createWarehouseExportOrderDto.type,
        status: createWarehouseExportOrderDto.status,
        fromWarehouse: fromWarehouse,
        toWarehouse: toWarehouse,
        createdBy: createdBy,
        totalAmount: 0,
      };

      const savedWarehouseExportOrder =
        await this.warehouseExportRepository.save(newWarehouseExportOrderData);
      
      let totalExportAmount = 0;

      if (createWarehouseExportOrderDto.items && createWarehouseExportOrderDto.items.length > 0) {
      const items =[];

      for (const itemDto of createWarehouseExportOrderDto.items) {
        // Kiểm tra partner
        const partner = await this.partnerRepository.findOne({
          where: { id: itemDto.partner },
          withDeleted: false,
        });

        if (!partner) {
          throw new ApplicationException(
            HttpStatus.BAD_REQUEST,
            MessageCode.PARTNER_NOT_FOUND,
          );
        }

        // Tạo item
        const newItem = this.warehouseExportItemRepository.create({
          name: itemDto.name,
          price: itemDto.price,
          lotNumber: itemDto.lotNumber,
          partner,
          quantityDocument: itemDto.quantityDocument,
          quantityActual: itemDto.quantityActual,
          document: savedWarehouseExportOrder,
          totalAmount: itemDto.price * itemDto.quantityActual,
        });
        totalExportAmount += newItem.totalAmount;
        items.push(newItem);
      }
      await this.warehouseExportItemRepository.save(items);
      
    }
    
    savedWarehouseExportOrder.totalAmount = totalExportAmount;

    return await this.warehouseExportRepository.save(savedWarehouseExportOrder);
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

  async update(id: number, updateDto: Partial<Warehouse_CreateExportOrderDto>,
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

    if (updateDto.type) {
      warehouse_export.type = updateDto.type;
    }

    if (updateDto.status) {
      warehouse_export.status = updateDto.status;
    }

    if (updateDto.fromWarehouse) {
      const fromWarehouse = await this.warehouseRepository.findOne({ where: { id: updateDto.fromWarehouse }, withDeleted: false });
      if (!fromWarehouse) {
        throw new ApplicationException(
          HttpStatus.BAD_REQUEST,
          MessageCode.WAREHOUSE_NOT_FOUND,
        );
      }
      warehouse_export.fromWarehouse = fromWarehouse;
    }

    if (updateDto.toWarehouse) {
      const toWarehouse = await this.warehouseRepository.findOne({ where: { id: updateDto.toWarehouse}, withDeleted: false });
      if (!toWarehouse) {
        throw new ApplicationException(
          HttpStatus.BAD_REQUEST,
          MessageCode.WAREHOUSE_NOT_FOUND,
        );
      }
      warehouse_export.toWarehouse = toWarehouse;
    }

    warehouse_export.updatedAt = new Date();

    let totalExportAmount = 0;

    // Xử lý cập nhật danh sách items nếu có
    if (updateDto.items && updateDto.items.length > 0) {
      const existingItems = warehouse_export.items || [];
      const updatedItems = [];
      const itemIdsToKeep = new Set<number>();

      for (const itemDto of updateDto.items) {
        let item;

        if (itemDto.id) {
          // Cập nhật item hiện có
          item = await this.warehouseExportItemRepository.findOne({
            where: { id: itemDto.id },
          });
          if (!item) {
            throw new ApplicationException(
              HttpStatus.BAD_REQUEST,
              MessageCode.WAREHOUSE_EXPORT_ITEM_NOT_FOUND,
            );
          }
          item.name = itemDto.name || item.name;
          item.price = itemDto.price || item.price;
          item.lotNumber = itemDto.lotNumber || item.lotNumber;
          item.quantityDocument = itemDto.quantityDocument || item.quantityDocument;
          item.quantityActual = itemDto.quantityActual || item.quantityActual;
          item.partner = 
            itemDto.partner &&
            (await this.partnerRepository.findOne({
              where: { id: itemDto.partner },
            })) || item.partner;
        } else {
          // Tạo item mới
          const partner = await this.partnerRepository.findOne({
            where: { id: itemDto.partner },
          });
          if (!partner) {
            throw new ApplicationException(
              HttpStatus.BAD_REQUEST,
              MessageCode.PARTNER_NOT_FOUND,
            );
          }
          item = this.warehouseExportItemRepository.create({
            name: itemDto.name,
            price: itemDto.price,
            lotNumber: itemDto.lotNumber,
            quantityDocument: itemDto.quantityDocument,
            quantityActual: itemDto.quantityActual,
            partner,
            document: warehouse_export,
          });
        }

        item.totalAmount = item.price * item.quantityActual;
        totalExportAmount += item.totalAmount;

        updatedItems.push(item);
        itemIdsToKeep.add(item.id);
      }

      // Xóa các item không còn trong danh sách mới
      for (const existingItem of existingItems) {
        if (!itemIdsToKeep.has(existingItem.id)) {
          await this.warehouseExportItemRepository.remove(existingItem);
        }
      }

      // Lưu các item mới và cập nhật
      await this.warehouseExportItemRepository.save(updatedItems);

      // Gán lại danh sách items
      warehouse_export.items = updatedItems;
    }

    // Cập nhật tổng số tiền
    warehouse_export.totalAmount = totalExportAmount;

    return await this.warehouseExportRepository.save(warehouse_export);
  } catch (e) {
    Logger.error('[Error] - ', e.message, null, null, true);
    throw new ApplicationException(
      HttpStatus.BAD_REQUEST,
      MessageCode.CANNOT_UPDATE_WAREHOUSE_EXPORT_ORDER,
    );
  }
}

  async updateStatus(id: number, status: string): Promise<WarehouseExportOrder> {
    try {
      const warehouse_export = await this.warehouseExportRepository.findOne({ where: { id }, withDeleted: false });
      if (!warehouse_export) {
        throw new ApplicationException(
          HttpStatus.BAD_REQUEST,
          MessageCode.WAREHOUSE_EXPORT_ORDER_NOT_FOUND,
        );
      }

      warehouse_export.status = status;
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
      rawText += `From Warehouse: ${warehouseExportOrder.fromWarehouse.name}\n`;
      rawText += `To Warehouse: ${warehouseExportOrder.toWarehouse.name}\n`;
      rawText += `Created By: ${warehouseExportOrder.createdBy.name}\n`;
      rawText += `Approved By: ${warehouseExportOrder.approvedBy ? warehouseExportOrder.approvedBy.name : 'N/A'}\n`;
      rawText += `Created At: ${warehouseExportOrder.createdAt.toISOString()}\n`;
      rawText += `Approved At: ${warehouseExportOrder.updatedAt ? warehouseExportOrder.updatedAt.toISOString() : 'N/A'}\n\n`;
  
      warehouseExportOrder.items.forEach((item) => {
        rawText += `Item: ${item.name}\n`;
        rawText += `Lot Number: ${item.lotNumber}\n`;
        rawText += `Price: ${item.price}\n`;
        rawText += `Quantity (Document): ${item.quantityDocument}\n`;
        rawText += `Quantity (Actual): ${item.quantityActual}\n`;
        rawText += `Total Amount: ${item.totalAmount}\n\n`;
      });
  
      return rawText;
    } catch (error) {
      throw new ApplicationException(HttpStatus.INTERNAL_SERVER_ERROR, 'Error generating raw text');
    }
  }
  
}


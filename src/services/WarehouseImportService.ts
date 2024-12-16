import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse_ImportProductsDto } from '@scm/dtos/Warehouse_ImportProductsDto';
import { Order } from '@scm/entities/order.entity';
import { Partner } from '@scm/entities/partner.entity';
import { Product } from '@scm/entities/product.entity';
import { User } from '@scm/entities/user.entity';
import { Warehouse } from '@scm/entities/warehouse.entity';
import { WarehouseImportItem } from '@scm/entities/warehouse_import_item.entity';
import { WarehouseImportOrder } from '@scm/entities/warehouse_import_order.entity';
import { WarehouseProduct } from '@scm/entities/warehouse_product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WarehouseImportService {
    constructor(
        @InjectRepository(WarehouseImportOrder) private readonly warehouseImportRepository: Repository<WarehouseImportOrder>,
        @InjectRepository(WarehouseImportItem) private readonly warehouseImportItemRepository: Repository<WarehouseImportItem>,
        @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
        @InjectRepository(Partner) private readonly partnerRepository: Repository<Partner>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(WarehouseProduct) private readonly warehouseProductRepository: Repository<WarehouseProduct>,
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    ) { }

    async listWarehouseImports(): Promise<WarehouseImportOrder[]> {
        return this.warehouseImportRepository.find({ relations: ['warehouse', 'items', 'items.product'], withDeleted: false });
    }

    async getWarehouseImportById(warehouseImportId: number): Promise<WarehouseImportOrder> {
        const warehouseImport = await this.warehouseImportRepository.findOne({
            where: { id: warehouseImportId },
            relations: ['warehouse', 'items'],
        });

        if (!warehouseImport) {
            throw new NotFoundException('Warehouse import not found');
        }

        return warehouseImport;
    }

    async importProducts(dto: Warehouse_ImportProductsDto): Promise<WarehouseImportOrder> {
        const { warehouseId } = dto;

        const warehouse = await this.warehouseRepository.findOne({ where: { id: warehouseId }, withDeleted: false });

        if (!warehouse) {
            throw new NotFoundException('Warehouse not found');
        }

        const createdBy = await this.userRepository.findOne({
            where: {},
            withDeleted: false,
        });

        const warehouseImport = this.warehouseImportRepository.create({
            warehouse,
            name: dto.name,
            importDate: new Date(),
            status: 'DRAFT',
            createdBy,
        });

        const savedWarehouseImport = await this.warehouseImportRepository.save(warehouseImport);

        const warehouseImportItems = []

        for (const item of dto.items) {
            const product = await this.productRepository.findOne({ where: { id: item.productId }, withDeleted: false })

            const it = await this.warehouseImportItemRepository.create({
                product: product,
                unitPrice: item.unitPrice,
                quantityDocument: item.quantityDocument,
                quantityActual: item.quantityActual,
                order: savedWarehouseImport,
            });

            warehouseImportItems.push(it);
        }

        await this.warehouseImportItemRepository.save(warehouseImportItems);

        return savedWarehouseImport;
    }

    async approveWarehouseImport(warehouseImportId: number): Promise<WarehouseImportOrder> {
        const warehouseImport = await this.warehouseImportRepository.findOne({
            where: { id: warehouseImportId },
            relations: ['warehouse', 'items', 'items.product'],
        });

        if (!warehouseImport) {
            throw new NotFoundException('Warehouse import not found');
        }

        warehouseImport.status = 'APPROVED';

        for (const item of warehouseImport.items) {
            // const warehouseProduct = await this.warehouseProductRepository.findOne({
            //     relations: ['product', 'warehouse'],
            //     where: { product: item.product, warehouse: warehouseImport.warehouse },
            //     withDeleted: false,
            // });
            const warehouseProduct = await this.warehouseProductRepository.createQueryBuilder('warehouse_product')
                .where('warehouse_product."warehouseId" = :warehouseId', { warehouseId: warehouseImport.warehouse.id })
                .andWhere('warehouse_product."productId" = :productId', { productId: item.product.id })
                .andWhere('warehouse_product."deletedAt" IS NULL')
                .getOne();

            if (!warehouseProduct) {
                await this.warehouseProductRepository.save({
                    product: item.product,
                    warehouse: warehouseImport.warehouse,
                    amount: item.quantityActual,
                });
            } else {
                warehouseProduct.amount += item.quantityActual;
                await this.warehouseProductRepository.save(warehouseProduct);
            }
        }

        return await this.warehouseImportRepository.save(warehouseImport);
    }
}

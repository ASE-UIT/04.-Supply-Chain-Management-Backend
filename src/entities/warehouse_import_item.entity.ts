import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { WarehouseImportOrder } from './warehouse_import_order.entity';

@Entity()
export class WarehouseImportItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unitPrice: number; // Đơn giá

  @Column()
  quantityDocument: number;  // Số lượng xuất theo chứng từ

  @Column()
  quantityActual: number;  // Số lượng xuất thực tế

  @ManyToOne(() => Product, product => product.id)
  product: Product;

  @ManyToOne(() => WarehouseImportOrder, (order) => order.items)
  order: WarehouseImportOrder;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

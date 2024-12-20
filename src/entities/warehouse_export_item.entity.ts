import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { WarehouseExportOrder } from './warehouse_export_order.entity';

@Entity()
export class WarehouseExportItem {
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

  @ManyToOne(() => WarehouseExportOrder, (order) => order.items)
  order: WarehouseExportOrder;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

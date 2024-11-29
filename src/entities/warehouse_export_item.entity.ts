import { Entity, PrimaryGeneratedColumn, Column,OneToOne, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, W } from 'typeorm';
import { WarehouseExportOrder } from './warehouse_export_order.entity';
import { Partner } from './partner.entity';

@Entity()
export  class WarehouseExportItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne( () => WarehouseExportOrder, (document) => document.items)
  document: WarehouseExportOrder;

  @Column()
  price: number; // Đơn giá

  @Column()
  lotNumber: number; // Số lô

  @OneToOne(()=> Partner, (partner) => partner.id)
  partner: Partner;

  @Column()
  quantityDocument: number;  // Số lượng xuất theo chứng từ

  @Column()
  quantityActual: number;  // Số lượng xuất thực tế

  @Column()
  totalAmount: number;  // Tổng tiền

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

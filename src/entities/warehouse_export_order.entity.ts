import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { WarehouseExportItem } from './warehouse_export_item.entity';
import { Warehouse } from './warehouse.entity';
import { User } from './user.entity';

@Entity()
export  class WarehouseExportOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => WarehouseExportItem, (item) => item.document)
  items: WarehouseExportItem[];

  @Column()
  type: string;

  @Column()
  status: string;

  @OneToOne(() => Warehouse, (warehouse) => warehouse.id)
  fromWarehouse: Warehouse;

  @OneToOne(() => Warehouse, (warehouse) => warehouse.id)
  toWarehouse: Warehouse;

  @OneToOne(() => User, (user) => user.id)
  createdBy: User;

  @OneToOne(() => User, (user) => user.id)
  approvedBy: User;

  @Column({ type: 'decimal', default: 0 })
  totalAmount: number;  // Tổng thành tiền của phiếu xuất

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

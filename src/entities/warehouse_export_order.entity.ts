import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { WarehouseExportItem } from './warehouse_export_item.entity';
import { Warehouse } from './warehouse.entity';
import { User } from './user.entity';

@Entity()
export  class WarehouseExportOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  exportDate: Date;

  @OneToMany(() => WarehouseExportItem, (item) => item.order)
  items: WarehouseExportItem[];

  @Column()
  status: string;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.id)
  warehouse: Warehouse;

  @ManyToOne(() => User, (user) => user.id)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.id)
  approvedBy: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

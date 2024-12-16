import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { WarehouseImportItem } from './warehouse_import_item.entity';
import { Warehouse } from './warehouse.entity';
import { User } from './user.entity';

@Entity()
export class WarehouseImportOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  importDate: Date;

  @OneToMany(() => WarehouseImportItem, (item) => item.order)
  items: WarehouseImportItem[];

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

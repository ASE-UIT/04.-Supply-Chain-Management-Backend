import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { WarehouseDocumentItem } from './warehouse_document_items.entity';
import { Warehouse } from './warehouse.entity';
import { User } from './user.entity';

@Entity()
export  class WarehouseDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => WarehouseDocumentItem, (item) => item.document)
  items: WarehouseDocumentItem[];

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

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
  price: number;

  @Column()
  lotNumber: number;

  @OneToOne(()=> Partner, (partner) => partner.id)
  partner: Partner;

  @Column()
  quanity: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

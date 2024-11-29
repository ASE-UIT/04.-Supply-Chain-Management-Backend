import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Partner } from './partner.entity';
import { WarehouseExportOrder} from './warehouse_export_order.entity'
@Entity()
export  class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Partner, (partner) => partner.warehouses)
  partner: Partner;

  @OneToOne(() => WarehouseExportOrder, (doc) => doc.fromWarehouse)
  exportFrom: WarehouseExportOrder;

  @OneToOne(() => WarehouseExportOrder, (doc) => doc.toWarehouse)
  exportTo: WarehouseExportOrder;

  @Column()
  address: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column()
  capacity: number;

  @Column()
  availability: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

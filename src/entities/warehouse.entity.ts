import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Partner } from './partner.entity';
import { WarehouseDocument} from './warehouse_documents.entity'
@Entity()
export  class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Partner, (partner) => partner.warehouses)
  partner: Partner;

  @OneToOne(() => WarehouseDocument, (doc) => doc.fromWarehouse)
  exportFrom: WarehouseDocument;

  @OneToOne(() => WarehouseDocument, (doc) => doc.toWarehouse)
  exportTo: WarehouseDocument;

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

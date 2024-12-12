import { Entity, PrimaryColumn, Column, Unique, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { WarehouseExportOrder} from './warehouse_export_order.entity'

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToOne(() => WarehouseExportOrder, (doc) => doc.createdBy)
  createdExport: WarehouseExportOrder[];

  @OneToOne(() => WarehouseExportOrder, (doc) => doc.approvedBy)
  approvedExport: WarehouseExportOrder[];

}

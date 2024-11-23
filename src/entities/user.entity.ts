import { Entity, PrimaryColumn, Column, Unique, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { WarehouseDocument} from './warehouse_documents.entity'

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

  @OneToOne(() => WarehouseDocument, (doc) => doc.createdBy)
  createdExport: WarehouseDocument[];

  @OneToOne(() => WarehouseDocument, (doc) => doc.approvedBy)
  approvedExport: WarehouseDocument[];

}

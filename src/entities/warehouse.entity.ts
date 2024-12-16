import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Partner } from './partner.entity';
import { WarehouseProduct } from './warehouse_product.entity';
@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Partner, (partner) => partner.warehouses)
  partner: Partner;

  @Column()
  address: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column()
  capacity: number;

  @Column({ default: 0 })
  currentCapacity: number;

  @Column()
  availability: boolean;

  @OneToMany(() => WarehouseProduct, (product) => product.warehouse)
  products: WarehouseProduct[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

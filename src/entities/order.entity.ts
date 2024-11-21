import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
  } from 'typeorm';
  import { Product } from './product.entity';
  import { Warehouse } from './warehouse.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'warehouseId' })
  warehouse: Warehouse;

  @Column()
  quantityInPaper: number;

  @Column()
  quantityInReality: number;

  @Column('float')
  unitPrice: number;

  @Column('float')
  totalPrice: number;

  @CreateDateColumn()
  importDate: Date;

  @Column({ default: 'PENDING' })
  status: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
  
  @BeforeInsert()
  @BeforeUpdate()
  calculateTotalPrice() {
    this.totalPrice = this.unitPrice * this.quantityInReality;
  }
}

  
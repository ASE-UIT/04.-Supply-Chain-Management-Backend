import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Partner } from './partner.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @Column()
  status: string;

  @ManyToOne(() => Partner, (partner) => partner.products)
  partner: Partner;

  @Column()
  type: string;

  @Column('float')
  size: number;

  @Column('float')
  weight: number;
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

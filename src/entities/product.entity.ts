import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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
  supplierId: number;

  @Column()
  type: string;

  @Column('float')
  size: number;

  @Column('float')
  weight: number;
}

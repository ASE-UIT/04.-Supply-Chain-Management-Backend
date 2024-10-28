import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Partner } from './partner.entity';

@Entity()
export  class Warehouse {
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

  @Column()
  availability: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

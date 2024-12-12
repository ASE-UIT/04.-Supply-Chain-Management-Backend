import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Partner } from './partner.entity';
import { Driver } from './driver.entity';

@Entity()
export  class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  licensePlate: string;

  @ManyToOne(() => Partner, (partner) => partner.vehicles)
  partner: Partner;

  @OneToOne(type => Driver, driver => driver.vehicle)
	driver: Driver | null

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

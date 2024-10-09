import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Partner } from './PartnerEntity';

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Partner, (partner) => partner.warehouses)
  partner: Partner;

  @Column()
  ownerId: number;

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
}

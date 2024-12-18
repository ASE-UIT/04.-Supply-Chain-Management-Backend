import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';
import { LegalPerson } from './legal_person.entity';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => LegalPerson, (legalPerson) => legalPerson.partner)
	@JoinColumn()
  legalPerson: LegalPerson;

  @OneToMany(() => Product, (product) => product.partner)
  products: Product[];

  @OneToMany(() => Warehouse, (warehouse) => warehouse.partner)
  warehouses: Warehouse[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.partner)
  vehicles: Vehicle[];
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

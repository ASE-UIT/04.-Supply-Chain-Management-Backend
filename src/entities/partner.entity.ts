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
} from 'typeorm';
import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';
import { LegalPerson } from './legal_person.entity';

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

  @OneToOne(() => LegalPerson, (legalPerson) => legalPerson.partner)
	@JoinColumn()
  legalPerson: LegalPerson;

  @OneToMany(() => Product, (product) => product.partner)
  products: Product[];

  @OneToMany(() => Warehouse, (warehouse) => warehouse.partner)
  warehouses: Warehouse[];
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

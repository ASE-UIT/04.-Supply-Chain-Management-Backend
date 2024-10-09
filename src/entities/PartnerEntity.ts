import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { Product } from './ProductEntity';
import { Warehouse } from './WarehouseEntity';

@Entity()
@Unique(['email'])
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

  @OneToMany(() => Product, (product) => product.partner)
  products: Product[];

  @OneToMany(() => Warehouse, (warehouse) => warehouse.partner)
  warehouses: Warehouse[];
}

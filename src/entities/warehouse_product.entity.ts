import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Partner } from './partner.entity';
import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';
@Entity()
export class WarehouseProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.id)
    warehouse: Warehouse;

    @ManyToOne(() => Product, (product) => product.id)
    product: Product;

    @Column()
    amount: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}

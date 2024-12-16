import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Order } from './order.entity';
import { WarehouseProduct } from './warehouse_product.entity';


@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;  // Số lượng xuất thực tế

    @ManyToOne(() => WarehouseProduct, product => product.id)
    product: WarehouseProduct;

    @ManyToOne(() => Order, (order) => order.items)
    order: Order;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}

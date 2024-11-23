import { Entity, PrimaryGeneratedColumn, Column,OneToOne, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, W } from 'typeorm';
import { WarehouseDocument } from './warehouse_documents.entity';
import { Partner } from './partner.entity';
@Entity()
export  class WarehouseDocumentItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne( () => WarehouseDocument, (document) => document.items)
  document: WarehouseDocument;

  @Column()
  price: number;

  @Column()
  lotNumber: number;

  @OneToOne(()=> Partner, (partner) => partner.id)
  partner: Partner;

  @Column()
  quanity: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

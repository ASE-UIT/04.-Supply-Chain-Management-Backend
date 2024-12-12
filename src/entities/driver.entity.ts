import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity()
@Unique(['licenseNumber'])
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  licenseNumber: string;

  @Column()
  licenseType: string;

  @OneToOne(type => Vehicle, vehicle => vehicle.driver)
	@JoinColumn()
	vehicle: Vehicle
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

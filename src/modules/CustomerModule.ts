import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from '../services/CustomerService';
import { CustomerController } from '../controllers/CustomerController';
import { Customer } from '../entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Customer,
    ])
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule { }

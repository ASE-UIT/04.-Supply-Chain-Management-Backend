import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageCode } from '@scm/commons/MessageCode';
import { ApplicationException } from '@scm/controllers/ExceptionController';
import { Customer_CreateDto } from '@scm/dtos/Customer_CreateDto';
import { Customer } from '@scm/entities/customer.entity'; // Adjust the import path according to your project structure
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer) private readonly customerModel: Repository<Customer>,
    ) { }

    async findAll(): Promise<Customer[]> {
        return await this.customerModel.find({ withDeleted: false });
    }

    async findById(id: number): Promise<Customer> {
        const customer = await this.customerModel.findOne({ where: { id }, withDeleted: false });
        if (!customer) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.CUSTOMER_NOT_FOUND);
        }
        return customer;
    }

    async create(customer: Customer_CreateDto): Promise<Customer> {
        return await this.customerModel.save({
            name: customer.name,
            presenter: customer.presenter,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
            address: customer.address,
            presenterPhoneNumber: customer.presenterPhoneNumber,
            presenterEmail: customer.presenterEmail,
            presenterAddress: customer.presenterAddress,
            taxCode: customer.taxCode,
            type: customer.type,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async update(id: number, customer: Customer_CreateDto): Promise<Customer> {
        const customerToUpdate = await this.findById(id);
        if (!customerToUpdate) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.CUSTOMER_NOT_FOUND);
        }

        customerToUpdate.name = customer.name || customerToUpdate.name;
        customerToUpdate.presenter = customer.presenter || customerToUpdate.presenter;
        customerToUpdate.email = customer.email || customerToUpdate.email;
        customerToUpdate.phoneNumber = customer.phoneNumber || customerToUpdate.phoneNumber;
        customerToUpdate.address = customer.address || customerToUpdate.address;
        customerToUpdate.presenterPhoneNumber = customer.presenterPhoneNumber || customerToUpdate.presenterPhoneNumber;
        customerToUpdate.presenterEmail = customer.presenterEmail || customerToUpdate.presenterEmail;
        customerToUpdate.presenterAddress = customer.presenterAddress || customerToUpdate.presenterAddress;
        customerToUpdate.taxCode = customer.taxCode || customerToUpdate.taxCode;
        customerToUpdate.type = customer.type || customerToUpdate.type;
        customerToUpdate.updatedAt = new Date();

        return await this.customerModel.save(customerToUpdate);
    }

    async delete(id: number): Promise<void> {
        const customerToDelete = await this.findById(id);
        if (!customerToDelete) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.CUSTOMER_NOT_FOUND);
        }

        await this.customerModel.softDelete(id);
    }
}

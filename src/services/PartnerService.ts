import { MessageCode } from '@scm/commons/MessageCode';
import { ApplicationException } from '@scm/controllers/ExceptionController';
import { Partner_CreateDto } from '@scm/dtos/Partner_CreateDto';
import { Partner } from '@scm/entities/partner.entity'; // Adjust the import path according to your project structure
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner) private readonly partnerModel: Repository<Partner>,
  ) { }

  async findAll(): Promise<Partner[]> {
    return await this.partnerModel.find({ withDeleted: false });
  }

  async findById(id: number): Promise<Partner> {
    const partner = await this.partnerModel.findOne({ where: { id }, withDeleted: false });
    if (!partner) {
      throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PRODUCT_NOT_FOUND);
    }
    return partner;
  }

  async create(partner: Partner_CreateDto): Promise<Partner> {
    return await this.partnerModel.save({
      ...partner,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async update(id: number, partner: Partner_CreateDto): Promise<Partner> {
    const partnerToUpdate = await this.findById(id);
    if (!partnerToUpdate) {
      throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PRODUCT_NOT_FOUND);
    }

    partnerToUpdate.name = partner.name;
    partnerToUpdate.type = partner.type;
    partnerToUpdate.email = partner.email;
    partnerToUpdate.phoneNumber = partner.phoneNumber;
    partnerToUpdate.updatedAt = new Date();

    return await this.partnerModel.save(partnerToUpdate);
  }

  async delete(id: number): Promise<void> {
    const partnerToDelete = await this.findById(id);
    if (!partnerToDelete) {
      throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PRODUCT_NOT_FOUND);
    }

    await this.partnerModel.softDelete(id);
  }
}

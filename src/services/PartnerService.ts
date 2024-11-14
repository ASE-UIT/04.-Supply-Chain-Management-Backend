import { MessageCode } from '@scm/commons/MessageCode';
import { ApplicationException } from '@scm/controllers/ExceptionController';
import { Partner_CreateDto } from '@scm/dtos/Partner_CreateDto';
import { Partner } from '@scm/entities/partner.entity'; // Adjust the import path according to your project structure
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LegalPerson } from '@scm/entities/legal_person.entity';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner) private readonly partnerModel: Repository<Partner>,
    @InjectRepository(LegalPerson) private readonly legalPersonModel: Repository<LegalPerson>,
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
    const legalPerson = await this.legalPersonModel.findOne({ where: { id: partner.legalPersonId }, withDeleted: false });
    if (!legalPerson) {
      throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.LEGAL_PERSON_NOT_FOUND);
    }



    return await this.partnerModel.save({
      name: partner.name,
      type: partner.type,
      email: partner.email,
      phoneNumber: partner.phoneNumber,
      legalPerson,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async update(id: number, partner: Partner_CreateDto): Promise<Partner> {
    const partnerToUpdate = await this.findById(id);
    if (!partnerToUpdate) {
      throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.PRODUCT_NOT_FOUND);
    }

    if (partner.legalPersonId) {
      const legalPerson = await this.legalPersonModel.findOne({ where: { id: partner.legalPersonId }, withDeleted: false });
      if (!legalPerson) {
        throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.LEGAL_PERSON_NOT_FOUND);
      }
      partnerToUpdate.legalPerson = legalPerson;
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

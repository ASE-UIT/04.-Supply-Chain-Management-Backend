import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageCode } from '@scm/commons/MessageCode';
import { ApplicationException } from '@scm/controllers/ExceptionController';
import { LegalPerson_CreateDto } from '@scm/dtos/LegalPerson_CreateDto';
import { LegalPerson } from '@scm/entities/legal_person.entity'; // Adjust the import path according to your project structure
import { Repository } from 'typeorm';

@Injectable()
export class LegalPersonService {
    constructor(
        @InjectRepository(LegalPerson) private readonly legalPersonModel: Repository<LegalPerson>,
    ) { }

    async findAll(): Promise<LegalPerson[]> {
        return await this.legalPersonModel.find({ withDeleted: false });
    }

    async findById(id: number): Promise<LegalPerson> {
        const legalPerson = await this.legalPersonModel.findOne({ where: { id }, withDeleted: false });
        if (!legalPerson) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.LEGAL_PERSON_NOT_FOUND);
        }
        return legalPerson;
    }

    async create(legalPerson: LegalPerson_CreateDto): Promise<LegalPerson> {
        return await this.legalPersonModel.save({
            name: legalPerson.name,
            phoneNumber: legalPerson.phoneNumber,
            email: legalPerson.email,
            identityNumber: legalPerson.identityNumber,
            address: legalPerson.address,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async update(id: number, legalPerson: LegalPerson_CreateDto): Promise<LegalPerson> {
        const legalPersonToUpdate = await this.findById(id);
        if (!legalPersonToUpdate) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.LEGAL_PERSON_NOT_FOUND);
        }

        legalPersonToUpdate.name = legalPerson.name;
        legalPersonToUpdate.identityNumber = legalPerson.identityNumber;
        legalPersonToUpdate.email = legalPerson.email;
        legalPersonToUpdate.phoneNumber = legalPerson.phoneNumber;
        legalPersonToUpdate.address = legalPerson.address;
        legalPersonToUpdate.updatedAt = new Date();

        return await this.legalPersonModel.save(legalPersonToUpdate);
    }

    async delete(id: number): Promise<void> {
        const legalPersonToDelete = await this.findById(id);
        if (!legalPersonToDelete) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.LEGAL_PERSON_NOT_FOUND);
        }

        await this.legalPersonModel.softDelete(id);
    }
}

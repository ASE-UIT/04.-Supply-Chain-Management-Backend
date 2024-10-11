import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Warehouse } from "../entities/warehouse.entity";

@Injectable()
export class WarehouseService {
    constructor( @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>) {}

    findAll(){
        return this.warehouseRepository.find({where: {deletedAt: null}});
    }

    findOne(id: number){
        return this.warehouseRepository.findOne({where: {id, deletedAt: null}});
    }

    async remove(id: number){
        const warehouse = await this.findOne(id);
        if (!warehouse) {
            return 'Warehouse not found';
        }
        warehouse.deletedAt = new Date();
        return this.warehouseRepository.save(warehouse);
    }
}
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WarehouseInterface, WarehouseModal } from '../models/Warehouse';

@Injectable()
export class WarehouseService {
    constructor(
        @InjectModel('Warehouse') private warehouseModel: Model<WarehouseInterface>,
    ) {}

    async findOne(id: number): Promise<WarehouseModal> {
        return this.warehouseModel.findById(id).exec(); 
    }

    async findAll(): Promise<WarehouseModal[]> {
        return this.warehouseModel.find().exec(); 
    }

    async remove(id: number): Promise<any> {
        return this.warehouseModel.findByIdAndDelete(id).exec(); 
    }
}

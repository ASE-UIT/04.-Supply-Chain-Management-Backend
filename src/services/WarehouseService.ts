import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Warehouse } from "../schemas/warehouse.schema"; // Sử dụng schema thay vì entity

@Injectable()
export class WarehouseService {
    constructor(
        @InjectModel('Warehouse') private warehouseModel: Model<Warehouse>,
    ) {}

    async findOne(id: string): Promise<Warehouse> {
        return this.warehouseModel.findById(id).exec(); // Dùng findById để tìm theo _id
    }

    async findAll(): Promise<Warehouse[]> {
        return this.warehouseModel.find().exec(); // Dùng find() để lấy tất cả
    }

    async remove(id: string): Promise<any> {
        return this.warehouseModel.findByIdAndDelete(id).exec(); // Dùng findByIdAndDelete để xóa
    }
}

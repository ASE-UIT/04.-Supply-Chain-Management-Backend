import { Document, model, Schema } from 'mongoose';

// Định nghĩa interface cho Warehouse
export interface WarehouseInterface extends Document {
  name: string;
  ownerId: number;
  address: string;
  type: string;
  status: string;
  capacity: number;
  availability: boolean;
}

// Định nghĩa schema cho Warehouse
export class WarehouseModal {
    name: string;
    ownerId: number;
    address: string;
    type: string;
    status: string;
    capacity: number;
    availability: boolean;

    constructor(warehouse: WarehouseInterface) {
        this.name = warehouse.name;
        this.ownerId = warehouse.ownerId;
        this.address = warehouse.address;
        this.type = warehouse.type;
        this.status = warehouse.status;
        this.capacity = warehouse.capacity;
        this.availability = warehouse.availability;
    }
}

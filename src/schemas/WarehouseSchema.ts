import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Partner } from './partner.schema'; // Sử dụng schema thay vì entity
import { Types } from 'mongoose';

@Schema()
export class Warehouse extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Partner' }) // Thay thế ManyToOne bằng ObjectId reference
  partner: Partner;

  @Prop({ required: true })
  ownerId: number;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true })
  availability: boolean;
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);

import { Schema } from 'mongoose';

// Định nghĩa WarehouseSchema
export const WarehouseSchema = new Schema({
    name: { type: String, required: true },   // Tên nhà kho
    partner: { type: Schema.Types.ObjectId, ref: 'Partner', required: true },  // Liên kết đến đối tác 
    ownerId: { type: Number, required: true },  // ID của chủ sở hữu
    address: { type: String, required: true },  // Địa chỉ của nhà kho
    type: { type: String, required: true },     // Loại nhà kho
    status: { type: String, required: true },   // Trạng thái của nhà kho
    capacity: { type: Number, required: true }, // Sức chứa của nhà kho
    availability: { type: Boolean, required: true },  // Tình trạng sẵn sàng của nhà kho
    createdAt: { type: Date, default: Date.now },  // Ngày tạo
    updatedAt: { type: Date, default: Date.now },  // Ngày cập nhật
    deletedAt: { type: Date, required: false },    // Ngày bị xóa (nếu có)
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });



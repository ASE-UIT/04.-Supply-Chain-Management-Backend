import { SystemRoleEnum } from '@scm/enums/SystemRoleEnum';
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(SystemRoleEnum) },
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: false },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    deletedAt: { type: Date, required: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
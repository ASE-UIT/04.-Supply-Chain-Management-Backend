import { MessageCode } from '@gstb/commons/MessageCode';
import { ApplicationException } from '@gstb/controllers/ExceptionController';
import { User_UpdateDto } from '@gstb/dtos/User_UpdateDto';
import { SystemRoleEnum } from '@gstb/enums/SystemRoleEnum';
import { UserInterface, UserModal } from '@gstb/models/User';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserInterface>
    ) {
    }

    async findAll(): Promise<UserModal[]> {
        try {
            Logger.log('[START] - Find all users', null, false);
            const users = await this.userModel.find({ deletedAt: null }).exec();
            return UserModal.fromArray(users);
        } catch (e) {
            Logger.error('[ERROR] - ' + e.message, null, null, true);
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.UNKNOWN_ERROR)
        }
    }

    async findOne(id: string): Promise<UserModal> {
        Logger.log('[START] - Find one user', null, false);
        const user = await this.userModel.findOne({ _id: id, deletedAt: null }).exec();
        if (!user) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.USER_NOT_FOUND);
        }
        return new UserModal(user);
    }

    async update(id: string, userDto: User_UpdateDto): Promise<UserModal> {
        Logger.log('[START] - Update user', null, false);
        const user = await this.userModel.findOne({ _id: id, deletedAt: null }).exec();
        if (!user) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.USER_NOT_FOUND);
        }

        if (userDto.name) {
            user.name = userDto.name;
        }
        if (userDto.email) {
            user.email = userDto.email;
        }
        if (userDto.description) {
            user.description = userDto.description;
        }
        user.updatedAt = new Date();

        try {
            const result = await user.save();
            return new UserModal(result);
        } catch (e) {
            Logger.error('[ERROR] - ' + e.message, null, null, true);
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.UNKNOWN_ERROR)
        }
    }

    async remove(id: string): Promise<UserModal> {
        Logger.log('[START] - Remove user', null, false);
        const user = await this.userModel.findOne({ _id: id, deletedAt: null }).exec();
        if (!user) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.USER_NOT_FOUND);
        }

        try {
            user.deletedAt = new Date();
            const result = await user.save();
            return new UserModal(result);
        } catch (e) {
            Logger.error('[ERROR] - ' + e.message, null, null, true);
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.UNKNOWN_ERROR)
        }
    }

    async updateRole(id: string, role: SystemRoleEnum): Promise<UserModal> {
        Logger.log('[START] - Update user role', null, false);
        const user = await this.userModel.findOne({ _id: id, deletedAt: null }).exec();
        if (!user) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.USER_NOT_FOUND);
        }

        if (!Object.values(SystemRoleEnum).includes(role)) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.UNKNOWN_ERROR);
        }

        user.role = role;
        user.updatedAt = new Date();

        try {
            const result = await user.save();
            return new UserModal(result);
        } catch (e) {
            Logger.error('[ERROR] - ' + e.message, null, null, true);
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.UNKNOWN_ERROR)
        }
    }
}
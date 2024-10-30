import { MessageCode } from '@scm/commons/MessageCode';
import { ApplicationException } from '@scm/controllers/ExceptionController';
import { User_UpdateDto } from '@scm/dtos/User_UpdateDto';
import { User } from '@scm/entities/user.entity';
import { SystemRoleEnum } from '@scm/enums/SystemRoleEnum';
import { UserModal } from '@scm/models/User';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) readonly userModel: Repository<User>,
    ) {
    }

    async findAll(): Promise<UserModal[]> {
        try {
            Logger.log('[START] - Find all users', null, false);
            const users = await this.userModel.find({ withDeleted: false });
            return UserModal.fromArray(users);
        } catch (e) {
            Logger.error('[ERROR] - ' + e.message, null, null, true);
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.UNKNOWN_ERROR)
        }
    }

    async findOne(id: number): Promise<UserModal> {
        Logger.log('[START] - Find one user', null, false);
        const user = await this.userModel.findOne({ where: { id: id }, withDeleted: false });
        if (!user) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.USER_NOT_FOUND);
        }
        return new UserModal(user);
    }

    async update(id: number, userDto: User_UpdateDto): Promise<UserModal> {
        Logger.log('[START] - Update user', null, false);
        const user = await this.userModel.findOne({ where: { id: id }, withDeleted: false });
        if (!user) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.USER_NOT_FOUND);
        }

        if (userDto.name) {
            user.name = userDto.name;
        }
        if (userDto.email) {
            user.email = userDto.email;
        }
        user.updatedAt = new Date();

        try {
            const result = await this.userModel.save(user);
            return new UserModal(result);
        } catch (e) {
            Logger.error('[ERROR] - ' + e.message, null, null, true);
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.UNKNOWN_ERROR)
        }
    }

    async remove(id: number): Promise<UserModal> {
        Logger.log('[START] - Remove user', null, false);
        const user = await this.userModel.findOne({ where: { id: id }, withDeleted: false });
        if (!user) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.USER_NOT_FOUND);
        }

        try {
            const result = await this.userModel.softDelete({ id: id });
            return new UserModal(user);
        } catch (e) {
            Logger.error('[ERROR] - ' + e.message, null, null, true);
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.UNKNOWN_ERROR)
        }
    }

    async updateRole(id: number, role: SystemRoleEnum): Promise<UserModal> {
        Logger.log('[START] - Update user role', null, false);
        const user = await this.userModel.findOne({ where: { id: id }, withDeleted: false });
        if (!user) {
            throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.USER_NOT_FOUND);
        }

        if (!Object.values(SystemRoleEnum).includes(role)) {
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.UNKNOWN_ERROR);
        }

        user.role = role;
        user.updatedAt = new Date();

        try {
            const result = await this.userModel.save(user);
            return new UserModal(result);
        } catch (e) {
            Logger.error('[ERROR] - ' + e.message, null, null, true);
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.UNKNOWN_ERROR)
        }
    }
}
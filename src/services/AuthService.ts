import { Constant } from '@scm/commons/Constant';
import { MessageCode } from '@scm/commons/MessageCode';
import { ApplicationException } from '@scm/controllers/ExceptionController';
import { Auth_CreateUserDto } from '@scm/dtos/Auth_CreateUserDto';
import { Auth_LoginDto } from '@scm/dtos/Auth_LoginDto';
import { User } from '@scm/entities/user.entity';
import { UserModal } from '@scm/models/User';
import { StringUtils } from '@scm/utils/StringUtils';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Repository } from 'typeorm';

const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) readonly userModel: Repository<User>,
        private readonly jwtService: JwtService
    ) {
    }

    async validateUser(payload: any): Promise<UserModal> {
        return new UserModal(await this.userModel.findOne({ where: { id: payload.id } }));
    }

    async login(userAuthDto: Auth_LoginDto): Promise<any> {
        try {
            const safeUsername = StringUtils.xssPrevent(userAuthDto.username);
            const safePassword = StringUtils.xssPrevent(userAuthDto.password);
            Logger.log('[START] - Login with user: ' + safeUsername, null, false);

            const user = await this.userModel.findOne({ where: { username: safeUsername } });

            if (!user) {
                throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.USER_NOT_REGISTER);
            }

            if (!bcrypt.compareSync(safePassword, user.password)) {
                throw new ApplicationException(HttpStatus.UNAUTHORIZED, MessageCode.USER_PASSWORD_WRONG);
            }

            const userData = new UserModal(user);

            const JWT_Payload = {
                id: user.id,
                username: user.username,
                role: user.role,
                name: user.name,
                email: user.email
            }

            const JWT = this.jwtService.sign(JWT_Payload);
            return { token: JWT, info: userData };
        } catch (e) {
            Logger.error('[ERROR] - ' + e.message, null, null, true);
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.USER_PASSWORD_WRONG)
        }
    }

    async createUser(userDto: Auth_CreateUserDto): Promise<any> {
        try {
            const requiredFields = ['username', 'password', 'role', 'name', 'email'];
            for (const field of requiredFields) {
                if (!userDto[field]) {
                    throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.PLEASE_FILL_ALL_REQUIRED_FIELDS);
                }
            }

            const username = StringUtils.xssPrevent(userDto.username);
            const user = await this.userModel.findOne({ where: { username: username } });
            if (user) {
                throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.USER_ALREADY_EXISTED);
            }

            const password = StringUtils.xssPrevent(userDto.password);
            const hash = bcrypt.hashSync(password, Constant.BCRYPT_ROUND);
            return {
                message: "OK",
                data: new UserModal(await this.userModel.save({
                    username: username,
                    password: hash,
                    role: userDto.role,
                    name: userDto.name,
                    email: userDto.email,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }))
            };
        } catch (error) {
            Logger.error('[ERROR] - ' + error.message, null, null, true);
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.USER_CREATE_ERROR);
        }
    }

    async changePassword(userId: number, newPassword: string): Promise<any> {
        try {
            const user = await this.userModel.findOne({ where: { id: userId } });
            if (!user) {
                throw new ApplicationException(HttpStatus.NOT_FOUND, MessageCode.USER_NOT_FOUND);
            }

            const password = StringUtils.xssPrevent(newPassword);
            const hash = bcrypt.hashSync(password, Constant.BCRYPT_ROUND);
            user.password = hash;
            user.updatedAt = new Date();
            await this.userModel.save(user);
            return { message: "OK", data: new UserModal(user) };
        } catch (error) {
            Logger.error('[ERROR] - ' + error.message, null, null, true);
            throw new ApplicationException(HttpStatus.BAD_REQUEST, MessageCode.UNKNOWN_ERROR);
        }
    }
}
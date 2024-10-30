import { Constant } from '@scm/commons/Constant';
import { MessageCode } from '@scm/commons/MessageCode';
import { ApplicationException } from '@scm/controllers/ExceptionController';
import { AuthService } from '@scm/services/AuthService';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Constant.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new ApplicationException(HttpStatus.UNAUTHORIZED, MessageCode.USER_NOT_FOUND);
        }
        Logger.log('Authorized - ' + user.id);
        return user;
    }
}
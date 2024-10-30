import { Constant } from '@scm/commons/Constant';
import { AuthController } from '@scm/controllers/AuthController';
import { JwtStrategy } from '@scm/guards/JWTStrategy';
import { UserSchema } from '@scm/schemas/UserSchema';
import { AuthService } from '@scm/services/AuthService';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        JwtModule.register({
            secret: Constant.JWT_SECRET,
            signOptions: { expiresIn: Constant.JWT_EXPIRE },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
    ],
})
export class AuthModule { }
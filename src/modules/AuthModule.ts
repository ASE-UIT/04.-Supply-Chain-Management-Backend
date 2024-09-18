import { Constant } from '@gstb/commons/Constant';
import { AuthController } from '@gstb/controllers/AuthController';
import { JwtStrategy } from '@gstb/guards/JWTStrategy';
import { UserSchema } from '@gstb/schemas/UserSchema';
import { AuthService } from '@gstb/services/AuthService';
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
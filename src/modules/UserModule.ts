import { Constant } from '@gstb/commons/Constant';
import { UserController } from '@gstb/controllers/UserController';
import { JwtStrategy } from '@gstb/guards/JWTStrategy';
import { UserSchema } from '@gstb/schemas/UserSchema';
import { UserService } from '@gstb/services/UserService';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [
        UserService,
    ],
})
export class UserModule { }
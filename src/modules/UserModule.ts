import { Constant } from '@scm/commons/Constant';
import { UserController } from '@scm/controllers/UserController';
import { JwtStrategy } from '@scm/guards/JWTStrategy';
import { UserSchema } from '@scm/schemas/UserSchema';
import { UserService } from '@scm/services/UserService';
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
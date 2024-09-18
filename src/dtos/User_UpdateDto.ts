import { OmitType } from "@nestjs/swagger";
import { Auth_CreateUserDto } from "./Auth_CreateUserDto";

export class User_UpdateDto extends OmitType(Auth_CreateUserDto, ['username', 'password', 'role'] as const) { }
import { SystemRoleEnum } from '@gstb/enums/SystemRoleEnum';
import { ApiProperty } from '@nestjs/swagger';

export class Auth_CreateUserDto {
    @ApiProperty({ type: String, required: true }) readonly username: string;
    @ApiProperty({ type: String, required: true }) readonly password: string;
    @ApiProperty({ type: String, required: true, enum: Object.values(SystemRoleEnum) }) readonly role: SystemRoleEnum;
    @ApiProperty({ type: String, required: true }) readonly name: string;
    @ApiProperty({ type: String, required: true }) readonly email: string;
    @ApiProperty({ type: String, required: false }) readonly description: string;
}
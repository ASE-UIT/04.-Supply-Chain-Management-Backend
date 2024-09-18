import { ApiProperty } from '@nestjs/swagger';

export class Auth_ChangePasswordDto {
    @ApiProperty({ type: String, required: true }) readonly password: string;
}
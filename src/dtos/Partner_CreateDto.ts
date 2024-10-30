import { ApiProperty } from '@nestjs/swagger';

export class Partner_CreateDto {
    @ApiProperty({ type: String, required: true })
    readonly name: string;
    @ApiProperty({ type: String, required: true })
    readonly type: string;
    @ApiProperty({ type: String, required: true })
    readonly email: string;
    @ApiProperty({ type: String, required: true })
    readonly phoneNumber: string;
}

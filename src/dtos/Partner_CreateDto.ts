import { ApiProperty } from '@nestjs/swagger';
import { PartnerTypeEnum } from '@scm/enums/PartnerTypeEnum';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Partner_CreateDto {
    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly legalPersonId: number;

    @ApiProperty({ type: String, required: true, enum: Object.values(PartnerTypeEnum) })
    @IsNotEmpty()
    @IsEnum(PartnerTypeEnum)
    readonly type: PartnerTypeEnum;

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    readonly phoneNumber: string;
}

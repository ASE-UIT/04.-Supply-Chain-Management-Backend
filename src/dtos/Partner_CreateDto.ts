import { ApiProperty } from '@nestjs/swagger';
import { PartnerTypeEnum } from '@scm/enums/PartnerTypeEnum';

export class Partner_CreateDto {
    @ApiProperty({ type: String, required: true })
    readonly name: string;
    @ApiProperty({ type: Number, required: true })
    readonly legalPersonId: number;
    @ApiProperty({ type: String, required: true, enum: Object.values(PartnerTypeEnum) })
    readonly type: PartnerTypeEnum;
    @ApiProperty({ type: String, required: true })
    readonly email: string;
    @ApiProperty({ type: String, required: true })
    readonly phoneNumber: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { CustomerTypeEnum } from '@scm/enums/CustomerTypeEnum';

export class Customer_CreateDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    presenter: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    presenterPhoneNumber: string;

    @ApiProperty()
    presenterEmail: string;

    @ApiProperty()
    presenterAddress: string;

    @ApiProperty()
    taxCode: string;

    @ApiProperty({ type: String, enum: Object.values(CustomerTypeEnum) })
    type: CustomerTypeEnum;
}
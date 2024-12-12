import { ApiProperty } from '@nestjs/swagger';
import { DriverLicenseTypeEnum } from '@scm/enums/DriverLicenseTypeEnum';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Driver_CreateDto {
    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    readonly phoneNumber: string;

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    readonly licenseNumber: string;

    @ApiProperty({ type: String, required: true, enum: Object.values(DriverLicenseTypeEnum) })
    @IsNotEmpty()
    @IsEnum(DriverLicenseTypeEnum)
    readonly licenseType: DriverLicenseTypeEnum;

    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly vehicleId: number;
}

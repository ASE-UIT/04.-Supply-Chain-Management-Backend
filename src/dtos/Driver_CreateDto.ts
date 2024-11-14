import { ApiProperty } from '@nestjs/swagger';
import { DriverLicenseTypeEnum } from '@scm/enums/DriverLicenseTypeEnum';

export class Driver_CreateDto {
    @ApiProperty({ type: String, required: true })
    readonly name: string;
    @ApiProperty({ type: String, required: true })
    readonly phoneNumber: string;
    @ApiProperty({ type: String, required: true })
    readonly licenseNumber: string;
    @ApiProperty({ type: String, required: true, enum: Object.values(DriverLicenseTypeEnum) })
    readonly licenseType: DriverLicenseTypeEnum;
    @ApiProperty({ type: Number, required: true })
    readonly vehicleId: number;
}

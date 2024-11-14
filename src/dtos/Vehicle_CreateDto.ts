import { ApiProperty } from '@nestjs/swagger';
import { ProductTypeEnum } from '@scm/enums/ProductTypeEnum';

export class Vehicle_CreateDto {
    @ApiProperty({ type: String, required: true })
    readonly licensePlate: string;
    @ApiProperty({ type: Number, required: true })
    readonly partnerId: number;
    @ApiProperty({ type: Number, required: true })
    readonly driverId: number;
    @ApiProperty({ type: String, required: true, enum: Object.values(ProductTypeEnum) })
    readonly type: ProductTypeEnum;
    @ApiProperty({ type: String, required: true })
    readonly status: string;
    @ApiProperty({ type: Number, required: true })
    readonly capacity: number;
    @ApiProperty({ type: Boolean, required: true })
    readonly availability: boolean;
}

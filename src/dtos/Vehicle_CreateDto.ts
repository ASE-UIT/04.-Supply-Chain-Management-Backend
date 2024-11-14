import { ApiProperty } from '@nestjs/swagger';
import { ProductTypeEnum } from '@scm/enums/ProductTypeEnum';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Vehicle_CreateDto {
    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    readonly licensePlate: string;

    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly partnerId: number;

    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly driverId: number;

    @ApiProperty({ type: String, required: true, enum: Object.values(ProductTypeEnum) })
    @IsNotEmpty()
    @IsEnum(ProductTypeEnum)
    readonly type: ProductTypeEnum;

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    readonly status: string;

    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly capacity: number;

    @ApiProperty({ type: Boolean, required: true })
    @IsNotEmpty()
    @IsBoolean()
    readonly availability: boolean;
}

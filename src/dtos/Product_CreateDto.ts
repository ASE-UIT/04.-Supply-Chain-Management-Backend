import { ApiProperty } from '@nestjs/swagger';
import { ProductTypeEnum } from '@scm/enums/ProductTypeEnum';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Product_CreateDto {
    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly ownerId: number;

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    readonly unit: string;

    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly unitPrice: number;

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    readonly status: string;

    @ApiProperty({ type: String, required: true, enum: Object.values(ProductTypeEnum) })
    @IsNotEmpty()
    @IsEnum(ProductTypeEnum)
    readonly type: ProductTypeEnum;

    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly size: number;

    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly weight: number;
}

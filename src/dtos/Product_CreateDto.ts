import { ApiProperty } from '@nestjs/swagger';
import { ProductTypeEnum } from '@scm/enums/ProductTypeEnum';

export class Product_CreateDto {
    @ApiProperty({ type: String, required: true })
    readonly name: string;
    @ApiProperty({ type: Number, required: true })
    readonly ownerId: number;
    @ApiProperty({ type: Number, required: true })
    readonly quantity: number;
    @ApiProperty({ type: String, required: true })
    readonly unit: string;
    @ApiProperty({ type: String, required: true })
    readonly status: string;
    @ApiProperty({ type: String, required: true, enum: Object.values(ProductTypeEnum) })
    readonly type: ProductTypeEnum;
    @ApiProperty({ type: Number, required: true })
    readonly size: number;
    @ApiProperty({ type: Number, required: true })
    readonly weight: number;
}

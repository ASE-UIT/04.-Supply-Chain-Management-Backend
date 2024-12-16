import { ApiProperty } from '@nestjs/swagger';
import { WarehouseDocumentStatusEnum } from '@scm/enums/WarehouseDocumentEnum';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

export class Warehouse_ImportItemDto {
    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly productId: string;

    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly unitPrice: number;

    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly quantityDocument: number;

    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly quantityActual: number;
}

export class Warehouse_ImportProductsDto {
    @ApiProperty({ type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly warehouseId: number;

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({ type: Date, required: true })
    @IsNotEmpty()
    readonly exportDate: Date;

    @ApiProperty({ type: String, required: true, enum: Object.values(WarehouseDocumentStatusEnum) })
    @IsNotEmpty()
    @IsEnum(WarehouseDocumentStatusEnum)
    readonly status: WarehouseDocumentStatusEnum;

    @ApiProperty({ type: Warehouse_ImportItemDto, required: true, isArray: true })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Warehouse_ImportItemDto)
    readonly items: Warehouse_ImportItemDto[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { WarehouseDocumentTypeEnum, WarehouseDocumentStatusEnum } from '@scm/enums/WarehouseExportTypeEnum';
import { Type } from 'class-transformer';
import { Warehouse_ExportItemsDto } from './Warehouse_ExportItemsDto';

export class Warehouse_CreateExportOrderDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ type: String, required: true, enum: Object.values(WarehouseDocumentTypeEnum) })
  @IsNotEmpty()
  @IsEnum(WarehouseDocumentTypeEnum)
  readonly type: WarehouseDocumentTypeEnum;

  @ApiProperty({ type: String, required: true, enum: Object.values(WarehouseDocumentStatusEnum) })
  @IsNotEmpty()
  @IsEnum(WarehouseDocumentStatusEnum)
  readonly status: WarehouseDocumentStatusEnum;

  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly createdBy: number; // User

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  readonly approvedBy?: number; // User

  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly fromWarehouse: number;

  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly toWarehouse: number;

  @ApiProperty({ type: [Warehouse_ExportItemsDto], required: true }) 
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Warehouse_ExportItemsDto)
  readonly items: Warehouse_ExportItemsDto[];
}

import { ApiProperty } from '@nestjs/swagger';
import { WarehouseDocumentTypeEnum, WarehouseDocumentStatusEnum } from '@scm/enums/WarehouseDocumentTypeEnum';
import { IsEnum, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class Warehouse_CreateDocumentDto {
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
}

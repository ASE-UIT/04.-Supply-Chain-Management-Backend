import { ApiProperty } from '@nestjs/swagger';
import { ProductTypeEnum } from '@scm/enums/ProductTypeEnum';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Warehouse_CreateWarehouseDto {
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
  readonly address: string;

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

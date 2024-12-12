import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class Warehouse_ExportItemsDto {
  @ApiProperty({ required: false, description: 'ID of the item' }) 
  @IsOptional() 
  @IsNumber()
  id?: number; 

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly lotNumber: number;
  
  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly quantityDocument: number;

  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly quantityActual: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  readonly partner: number;

  @ApiProperty({ type: Boolean, required: true })
  @IsBoolean()
  readonly isDeleted: boolean;

  @ApiProperty({ type: String, required: true })
  @IsString()
  readonly createdAt: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  readonly updatedAt: string;
}

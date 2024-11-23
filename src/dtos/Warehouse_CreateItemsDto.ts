import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Warehouse_CreateItemsDto {
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
  readonly quanity: number;

}

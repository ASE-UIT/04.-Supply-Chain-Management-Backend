import { ApiProperty } from '@nestjs/swagger';

export class Order_CreateDto {
  @ApiProperty({ type: Number, required: true })
  readonly productId: number;

  @ApiProperty({ type: Number, required: true })
  readonly warehouseId: number;

  @ApiProperty({ type: Number, required: true })
  readonly quantityInPaper: number;

  @ApiProperty({ type: Number, required: true })
  readonly quantityInReality: number;

  @ApiProperty({ type: Number, required: true })
  readonly unitPrice: number;

  @ApiProperty({ type: Number, required: true })
  readonly totalPrice: number;

  @ApiProperty({ type: Date, required: true })
  readonly importDate: Date;
}

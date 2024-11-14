import { StringUtils } from '@scm/utils/StringUtils';
import { ApiProperty } from '@nestjs/swagger';
import { ProductTypeEnum } from '@scm/enums/ProductTypeEnum';

export class Warehouse_CreateWarehouseDto {
  @ApiProperty({ type: String, required: true })
  readonly name: string;
  @ApiProperty({ type: Number, required: true })
  readonly ownerId: number;
  @ApiProperty({ type: String, required: true })
  readonly address: string;
  @ApiProperty({ type: String, required: true, enum: Object.values(ProductTypeEnum) })
  readonly type: ProductTypeEnum;
  @ApiProperty({ type: String, required: true })
  readonly status: string;
  @ApiProperty({ type: Number, required: true })
  readonly capacity: number;
  @ApiProperty({ type: Boolean, required: true })
  readonly availability: boolean;
}

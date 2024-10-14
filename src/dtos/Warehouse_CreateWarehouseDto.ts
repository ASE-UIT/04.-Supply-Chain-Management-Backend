import { StringUtils } from '@gstb/utils/StringUtils';
import { ApiProperty } from '@nestjs/swagger';

export class Warehouse_CreateWarehouseDto {
  @ApiProperty({ type: String, required: true })
  readonly name: string;
  @ApiProperty({ type: Number, required: true })
  readonly ownerId: number;
  @ApiProperty({ type: String, required: true })
  readonly address: string;
  @ApiProperty({ type: String, required: true })
  readonly type: string;
  @ApiProperty({ type: String, required: true })
  readonly status: string;
  @ApiProperty({ type: Number, required: true })
  readonly capacity: number;
  @ApiProperty({ type: Boolean, required: true })
  readonly availability: boolean;
}

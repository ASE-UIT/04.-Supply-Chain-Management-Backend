import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusEnum } from '@scm/enums/OrderStatusEnum';

class OrderItem_Dto {
  @ApiProperty({ type: Number, required: true })
  readonly productId: number;

  @ApiProperty({ type: Number, required: true })
  readonly quantity: number;
}

export class Order_CreateDto {
  @ApiProperty({ type: Number, required: true })
  readonly customerId: number;

  @ApiProperty({ type: String, required: true })
  readonly name: string;

  @ApiProperty({ type: String, required: true })
  readonly remark: string;

  @ApiProperty({ type: String, required: true, enum: Object.values(OrderStatusEnum) })
  readonly status: OrderStatusEnum;

  @ApiProperty({ type: OrderItem_Dto, required: true, isArray: true })
  readonly items: OrderItem_Dto[];
}

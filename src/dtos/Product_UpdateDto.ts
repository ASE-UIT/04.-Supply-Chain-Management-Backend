import { OmitType } from '@nestjs/swagger';
import { Product_CreateDto } from './Product_CreateDto';

export class Product_UpdateDto extends OmitType(Product_CreateDto, [] as const) {
}

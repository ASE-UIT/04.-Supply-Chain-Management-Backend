import { PartialType } from '@nestjs/mapped-types';
import { Warehouse_ExportProductsDto } from './Warehouse_ExportProductsDto';

export class Warehouse_UpdateExportOrderDto extends PartialType(Warehouse_ExportProductsDto) {}

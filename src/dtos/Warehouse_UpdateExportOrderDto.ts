import { PartialType } from '@nestjs/mapped-types';
import { Warehouse_CreateExportOrderDto } from './Warehouse_CreateExportOrderDto';

export class Warehouse_UpdateExportOrderDto extends PartialType(Warehouse_CreateExportOrderDto) {}

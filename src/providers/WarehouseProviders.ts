import { DataSource } from 'typeorm';
import { Warehouse } from '../entities/WarehouseEntity';

export const WarehouseProviders = [
  {
    provide: 'WAREHOUSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Warehouse),
    inject: ['DATA_SOURCE'],
  },
];

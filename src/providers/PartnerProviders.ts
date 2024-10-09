import { DataSource } from 'typeorm';
import { Partner } from '../entities/PartnerEntity';

export const UserProviders = [
  {
    provide: 'PARTNER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Partner),
    inject: ['DATA_SOURCE'],
  },
];

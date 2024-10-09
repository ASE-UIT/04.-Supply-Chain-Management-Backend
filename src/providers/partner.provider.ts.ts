import { Partner } from '@gstb/entities/partner.entity';
import { DataSource } from 'typeorm';

export const UserProviders = [
  {
    provide: 'PARTNER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Partner),
    inject: ['DATA_SOURCE'],
  },
];

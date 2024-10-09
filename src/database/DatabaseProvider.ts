import { DataSource } from "typeorm";
export const databaseProviders = [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'postgres',
          url:process.env.DATABASE_URL,
          entities: [
              __dirname + '/../**/*.entity{.ts,.js}',
          ],
          synchronize: true,
        });
  
        return dataSource.initialize();
      },
    },
  ];
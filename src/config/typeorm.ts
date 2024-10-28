import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from 'dotenv';
import { envFiles } from "./env";
dotenvConfig({ path: envFiles });

const typeorm_config = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: false,
}
export default registerAs('typeorm', () => typeorm_config)
export const connectionSource = new DataSource(typeorm_config as DataSourceOptions);
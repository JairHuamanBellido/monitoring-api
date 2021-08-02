import { DatabaseConfig } from '@infrastructure/config/DatabaseConfig';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DatabaseConfig.DB_HOST,
  port: DatabaseConfig.DB_PORT,
  username: DatabaseConfig.DB_USERNAME,
  password: DatabaseConfig.DB_PASSWORD,
  database: DatabaseConfig.DB_NAME,
  entities: [__dirname + '/entity/**/*{.ts,.js}'],
  logging: false,
  migrationsRun: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTransactionMode: 'all',
  cli: {
    migrationsDir: 'src/infrastructure/database/migrations',
  },
};

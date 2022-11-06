import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const connexionOptions = (): TypeOrmModuleOptions => {
  return {
    autoLoadEntities: true,
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'tips',
    synchronize: true,
  };
};

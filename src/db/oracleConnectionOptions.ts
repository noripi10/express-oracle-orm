import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

const oracleConnectionOptions: ConnectionOptions = {
  type: 'oracle',
  host: process.env.ORACLE_HOST,
  port: parseInt(process.env.ORACLE_PORT ?? '1521'),
  username: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_CONNECTION_STRING,
  synchronize: true,
  logging: false,
  entities: ['./entity/**/*.ts'],
  migrations: ['./migration/**/*.ts'],
  subscribers: ['./subscriber/**/*.ts'],
  cli: {
    entitiesDir: './entity',
    migrationsDir: './migration',
    subscribersDir: './subscriber',
  },
};

export default oracleConnectionOptions;

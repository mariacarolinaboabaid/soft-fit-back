import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

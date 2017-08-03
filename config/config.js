import dotenv from 'dotenv';

dotenv.config();
export default {
  database: process.env.database,
  database_host: process.env.database_host,
  app_port: process.env.app_port,
  jwtSecret: 'SecretImage',
  jwtSession: { session: false },
};

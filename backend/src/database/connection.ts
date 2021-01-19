import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.APP_DB_HOST || 'localhost',
    user: process.env.APP_DB_USER || 'postgres',
    password: process.env.APP_DB_PASSWORD || 'postgres',
    database: process.env.APP_DB_NAME || 'proffy_db',
  },
  useNullAsDefault: true,
});

export default db;

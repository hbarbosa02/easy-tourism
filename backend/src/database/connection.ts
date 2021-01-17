import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "proffy_db",
  },
  useNullAsDefault: true,
});

export default db;

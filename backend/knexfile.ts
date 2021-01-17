import path from "path";

module.exports = {
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "proffy_db",
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  useNullAsDefault: true,
};

const { Client } = require("pg");

const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/mint_modern`;
const client = new Client({
  connectionString: DB_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;

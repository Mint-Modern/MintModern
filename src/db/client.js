const { Client } = require("pg");

const client = new Client("postgres://localhost:5432/mint_modern");

module.exports = client;

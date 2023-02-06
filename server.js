require("dotenv").config();
const PORT = process.env.PORT || 8080;
const express = require("express");
const server = express();
const apiRouter = require("./api");
const morgan = require("morgan");
const client = require("./db/client.js");
const cors = require("cors");

client.connect();

server.use(morgan("dev"));

server.use(express.json());

server.use(cors());

const path = require("path");
server.use(express.static(path.resolve(__dirname, "..", "..", "build")));

server.use("/api", apiRouter);

server.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "..", "..", "build", "index.html"));
});

server.get("*", (req, res) => {
  res.status(404).send({
    error: "404 - NOT FOUND",
    message: "No route found for the requested URL",
  });
});

server.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  console.log({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});

module.exports = server;

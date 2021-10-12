
const winston = require("winston");
require("dotenv").config()
const express = require("express");
const app = express();
const connection = require("./startup/database")
const cors = require("cors")
const config = require("config")

require("./startup/logging")();
app.use(cors())
require("./startup/routes")(app);
connection();
require("./startup/config")();
require("./startup/validation")();


const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
    winston.info(`Listening on port ${port}...`)
);

module.exports = server;
const Joi = require("joi")
Joi.ObjectId = require("joi-objectid")(Joi);
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
require("./startup/production")(app);


const port = process.env.PORT || 8000;
console.log(process.env.DB)
const server = app.listen(port, () =>
    winston.info(`Listening on port ${port}...`)
);

module.exports = server;
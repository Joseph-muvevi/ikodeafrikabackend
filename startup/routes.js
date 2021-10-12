const express = require('express');
const auth = require('../routes/auth');
const users = require("../routes/users")
const admins = require("../routes/admins")
const tuitors = require("../routes/tuitors")
const students = require("../routes/students")
const error = require("../middleware/errors");

module.exports = function(app) {
	app.use(express.json());
	app.use("/api/auth", auth);
	app.use("/api/users", users);
	app.use("/api/tuitors", tuitors);
	app.use("/api/admin", admins);
	app.use("/api/students", students);
	app.use(error);
}
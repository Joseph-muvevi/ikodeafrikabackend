const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Student, validate } = require("../models/student");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
	const student = await Student.findById(req.student._id).select("-password");
	res.send(student);
});

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let existingStudent = await Student.findOne({ email: req.body.email });
	if (existingStudent) return res.status(400).send("Student already registered.");

	student = new Student(req.body);
	const salt = await bcrypt.genSalt(10);
	student.password = await bcrypt.hash(student.password, salt);
	await student.save();

	const token = student.generateAuthToken();
	res
	.header("x-auth-token", token)
	.send(_.pick(student, ["_id", "firstname", "email"]));
});

module.exports = router;
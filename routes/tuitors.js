const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Tuitor, validate } = require("../models/tuitor");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
	const tuitor = await Tuitor.findById(req.tuitor._id).select("-password");
	res.send(tuitor);
});

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let existingtuitor = await Tuitor.findOne({ email: req.body.email });
	if (existingtuitor) return res.status(400).send("Tuitor already registered.");

	let tuitor = new Tuitor(req.body);
	const salt = await bcrypt.genSalt(10);
	tuitor.password = await bcrypt.hash(tuitor.password, salt);
	await tuitor.save();

	const token = tuitor.generateAuthToken();
	res
	.header("x-auth-token", token)
	.send(_.pick(tuitor, ["_id", "name", "email"]));
});

module.exports = router;
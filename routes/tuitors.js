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

// update
router.put("/:id", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// find is there is an existing email
	const email = await Tuitor.findOne({ email: req.body.email });
	if (!email) return res.status(404).send("Invalid email");

	const tuitor = await Tuitor.findByIdAndUpdate(
	req.params.id,
	{ $set: req.body },
	{ new: true }
	);

	// hashing the passwords
	const salt = await bcrypt.genSalt(10);
	tuitor.password = await bcrypt.hash(tuitor.password, salt);

	await tuitor.save();

	const token = tuitor.generateAuthToken();
	res
	.header("x-auth-token", token)
	.send(_.pick(tuitor, ["_id", "name", "email"]));
});

// delete
router.delete("/:id", async (req, res) => {
	const tuitor = await Tuitor.findByIdAndRemove(req.params.id);
	if (!tuitor) return res.status(404).send("Tuitor does not exist");
	res.send(tuitor);
});

module.exports = router;
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

// there is auth middleware before /me andasync
router.get("/me", auth, async (req, res) => {
	const me = await User.findById(req.user._id).select("-password");
	res.send(me);
  });
  

router.get("/", async (req, res) => {
	const user = await User.find().sort()
	res.send(user)
})

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let existingUser = await User.findOne({ email: req.body.email });
	if (existingUser) return res.status(400).send("User already registered.");

	let user = new User(req.body);
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	await user.save();

	const token = user.generateAuthToken();
	res
	.header("x-auth-token", token)
	.send(_.pick(user, ["_id", "name", "email"]));
});

	// update
router.put("/:id", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// find is there is an existing email
	const email = await User.findOne({ email: req.body.email });
	if (!email) return res.status(404).send("Invalid email");

	const user = await User.findByIdAndUpdate(
	req.params.id,
	{ $set: req.body },
	{ new: true }
	);

	// hashing the passwords
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	const token = user.generateAuthToken();
	res
	.header("x-auth-token", token)
	.send(_.pick(user, ["_id", "name", "email"]));
});

// delete
router.delete("/:id", async (req, res) => {
	const user = await User.findByIdAndRemove(req.params.id);
	if (!user) return res.status(404).send("User does not exist");
	res.send(user);
});
	
module.exports = router;
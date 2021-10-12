const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Assignment, validate } = require("../models/assignment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	const assignment = await Assignment.find()
		.select("-__v")
		.sort("name");
	res.send(assignment);
});

// get by id
router.get("/:id", validateObjectId, async (req, res) => {
	const assignments = await Assignment.findById(req.params.id).select("-__v");
	
	if (!assignments)
		return res.status(404).send("The assignments with the given ID was not found.");
	
	res.send(assignments);
	});
	
//  auth,
router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let assignments = new Assignment(req.body);
	assignments = await assignments.save();

	res.send(assignments);
});

// [auth, validateObjectId] The twi of these were here below
router.put("/:id", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const assignments = await Assignment.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{
			new: true
		}
	);

	if (!assignments)
		return res.status(404).send("The assignments with the given ID was not found.");

	res.send(assignments);
});

// [auth, admin, validateObjectId],
router.delete("/:id",  async (req, res) => {
	const assignments = await Assignment.findByIdAndRemove(req.params.id);

	if (!assignments)
		return res.status(404).send("The assignments with the given ID was not found.");

	res.send(assignments);
});



module.exports = router;
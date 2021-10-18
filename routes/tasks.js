const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Task, validate } = require("../models/task");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	const task = await Task
		.find()
		.populate("student", "firstname picture -_id")
		.select("-__v")
		.sort("name");
	res.send(task);
});

// get by id
router.get("/:id", validateObjectId, async (req, res) => {
	const tasks = await Task.findById(req.params.id).select("-__v");
	
	if (!tasks)
		return res.status(404).send("The tasks with the given ID was not found.");
	
	res.send(tasks);
	});
	
//  auth,
router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let tasks = new Task(req.body);
	tasks = await tasks.save();

	res.send(tasks);
});

// [auth, validateObjectId] The twi of these were here below
router.put("/:id", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const tasks = await Task.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{
			new: true
		}
	);

	if (!tasks)
		return res.status(404).send("The tasks with the given ID was not found.");

	res.send(tasks);
});

// [auth, admin, validateObjectId],
router.delete("/:id",  async (req, res) => {
	const tasks = await Task.findByIdAndRemove(req.params.id);

	if (!tasks)
		return res.status(404).send("The tasks with the given ID was not found.");

	res.send(tasks);
});



module.exports = router;
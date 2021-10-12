const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Course, validate } = require("../models/course");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	const course = await Course.find()
		.select("-__v")
		.sort("name");
	res.send(course);
});

// get by id
router.get("/:id", validateObjectId, async (req, res) => {
	const courses = await Course.findById(req.params.id).select("-__v");
	
	if (!courses)
		return res.status(404).send("The courses with the given ID was not found.");
	
	res.send(courses);
	});
	
//  auth,
router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let courses = new Course(req.body);
	courses = await courses.save();

	res.send(courses);
});

// [auth, validateObjectId] The twi of these were here below
router.put("/:id", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const courses = await Course.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{
			new: true
		}
	);

	if (!courses)
		return res.status(404).send("The courses with the given ID was not found.");

	res.send(courses);
});

// [auth, admin, validateObjectId],
router.delete("/:id",  async (req, res) => {
	const courses = await Course.findByIdAndRemove(req.params.id);

	if (!courses)
		return res.status(404).send("The courses with the given ID was not found.");

	res.send(courses);
});



module.exports = router;
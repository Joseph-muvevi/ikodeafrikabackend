const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Review, validate } = require("../models/review");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	const review = await Review
		.find()
		.populate("student", "firstname picture email -_id")
		.select("-__v")
	res.send(review);
});

// get by id
router.get("/:id", validateObjectId, async (req, res) => {
	const reviews = await Review.findById(req.params.id)
        .select("-__v")
        .populate("student", "firstname picture email -_id")
	
	if (!reviews)
		return res.status(404).send("The reviews with the given ID was not found.");
	
	res.send(reviews);
	});
	
//  auth,
router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let reviews = new Review(req.body);
	reviews = await reviews.save();

	res.send(reviews);
});

// [auth, validateObjectId] The twi of these were here below
router.put("/:id", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const reviews = await Review.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{
			new: true
		}
	);

	if (!reviews)
		return res.status(404).send("The reviews with the given ID was not found.");

	res.send(reviews);
});

// [auth, admin, validateObjectId],
router.delete("/:id",  async (req, res) => {
	const reviews = await Review.findByIdAndRemove(req.params.id);

	if (!reviews)
		return res.status(404).send("The reviews with the given ID was not found.");

	res.send(reviews);
});



module.exports = router;
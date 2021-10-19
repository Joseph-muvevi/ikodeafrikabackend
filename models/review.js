const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// review Schema
const reviewSchema = new Schema({
	title: {
		type: String,
		minLength: 5,
		maxLength: 100,
		required: true
	},
	details: {
		type: String,
		minLength: 20,
		maxLength: 1000,
		required: true
	},
	ratings: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "students"
	},
	// ratings, enroled
	date: {
		type: Date,
		default: Date.now
	}
}, {
	timestamps: true
})

// model
const Review = mongoose.model("reviews", reviewSchema)

// validation
const validate = (review) => {
	const schema = Joi.object({
		title: Joi.string().min(5).max(100).required(),
		details: Joi.string().min(20).max(1000).required(),
		ratings: Joi.number().min(1).max(5).required(),
		student: Joi.objectId().required()
	})

	return schema.validate(review)
}

module.exports.Review = Review
module.exports.validate = validate
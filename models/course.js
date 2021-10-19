const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// flag Schema
const courseSchema = new Schema({
	title: {
		type: String,
		minLength: 5,
		maxLength: 100,
		required: true
	},
	tuitor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "tuitor",
		required: true
	},
	videofile: {
		type: String,
		minLength: 5,
		maxLength: 200
	},
	articlefile: {
		type: String,
		minLength: 5,
		maxLength: 5000
	},
	subject: {
		type: String,
		minLength: 5,
		maxLength: 100,
		required: true
	},
	units: {
		type: Array,
		min: 1,
		max: 20,
		required: true
	},
	tags: {
		type: Array,
		min: 1,
		max: 10,
		required: true
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
const Course = mongoose.model("courses", courseSchema)

// validation
const validate = (flag) => {
	const schema = Joi.object({
		title: Joi.string().min(5).max(100).required(),
		videofile: Joi.string().min(5).max(200).required(),
		articlefile: Joi.string().min(5).max(5000).required(),
		subject: Joi.string().min(5).max(100).required(),
		units: Joi.array().min(1).max(20).required(),
		tags: Joi.array().min(1).max(10).required(),
		tuitor: Joi.objectId().required()
	})

	return schema.validate(flag)
}

module.exports.Course = Course
module.exports.validate = validate
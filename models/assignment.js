const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// assignment Schema
const assignmentSchema = new Schema({
	title: {
		type: String,
		minLength: 5,
		maxLength: 100,
		required: true
	}, 
	assignmentDescription: {
		type: String,
		minLength: 50,
		maxLength: 1000,
		required: true
	},
	duration : {
		// should be number in hours or minutes <<number>>
		type: Number,
		min: 1,
		max: 4000,
		required: true
	},
	difficulty: {
		type: Number,
		min: 1,
		max: 5
	},
	category: {
		type: String,
		minLength: 3,
		maxLength: 100,
		required: true
	},
	deadline: {
		type: String,
		minLength: 3,
		maxLength: 100,
		required: true
	},
	isFormal: {
		type: Boolean,
		required: true
	},
	steps: {
		type: Array,
		required: true,
		min: 5,
		max: 1500
	},
	tags: {
		type: Array,
		required: true,
		min: 2, 
		max: 10
	},
	tuitor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "tuitors",
		required: true,
		min: 2, 
		max: 10
	},
	date: {
		type: Date,
		default: Date.now
	}
},{
	timestamps: true
})

// model
const Assignment = mongoose.model("assignments", assignmentSchema)

// validation
const validate = (assignment) => {
	const schema = Joi.object({
		title: Joi.string().min(5).max(100).required(),
		assignmentDescription: Joi.string().min(50).max(1000).required(),
		duration: Joi.number().min(1).max(4000).required(),
		difficulty: Joi.number().min(1).max(5),
		category: Joi.string().min(3).max(100).required(),
		deadline: Joi.string().min(3).max(100).required(),
		steps: Joi.array().min(3).max(1500).required(),
		isFormal: Joi.boolean().required(),
		tags: Joi.array().min(2).max(10).required(),
		tuitor: Joi.objectId().required()
	})

	return schema.validate(assignment)
}

module.exports.Assignment = Assignment
module.exports.validate = validate
const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// habit Schema
const habitSchema = new Schema({
	title: {
		type: String,
		minLength: 5,
		maxLength: 100,
		required: true
	}, 
	habitDescription: {
		type: String,
		minLength: 40,
		maxLength: 500,
		required: true
	},
	difficulty: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	repeat: {
		type: String,
		minLength: 5,
		maxLength: 100,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
}, {
	timestamps: true
})

// model
const Habit = mongoose.model("habits", habitSchema)

// validation
const validate = (habit) => {
	const schema = Joi.object({
		title: Joi.string().min(5).max(100).required(),
		habitDescription: Joi.string().min(40).max(500).required(),
		difficulty: Joi.number().min(1).max(5).required(),
		repeat: Joi.string().min(5).max(100).required(),
	})

	return schema.validate(habit)
}

module.exports.Habit = Habit
module.exports.validate = validate
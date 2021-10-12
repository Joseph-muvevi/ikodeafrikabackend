const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// flag Schema
const flagSchema = new Schema({
	title: {
		type: String,
		minLength: 5,
		maxLength: 100,
		required: true
	}, 
	isFlagged: {
		type: Boolean,
		required: true
	},
	flagDescription: {
		type: String,
		minLength: 40,
		maxLength: 500,
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
const Flag = mongoose.model("flags", flagSchema)

// validation
const validate = (flag) => {
	const schema = Joi.object({
		title: Joi.string().min(5).max(100).required(),
		isFlagged: Joi.boolean().required(),
		flagDescription: Joi.string().min(40).max(500).required()
	})

	return schema.validate(flag)
}

module.exports.Flag = Flag
module.exports.validate = validate
const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// comment Schema
const commentSchema = new Schema({
	title: {
		type: String,
		minLength: 5,
		maxLength: 100,
		required: true
	}, 
	comment: {
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
const Comment = mongoose.model("comments", commentSchema)

// validation
const validate = (comment) => {
	const schema = Joi.object({
		title: Joi.string().min(5).max(100).required(),
		comment: Joi.string().min(40).max(500).required()
	})

	return schema.validate(comment)
}

module.exports.Comment = Comment
module.exports.validate = validate
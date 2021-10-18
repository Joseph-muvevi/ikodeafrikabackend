const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// task Schema
const taskSchema = new Schema({
	title: {
		type: String,
		minLength: 5,
		maxLength: 100,
		required: true
	}, 
	description: {
		type: String,
		minLength: 20,
		maxLength: 1000,
		required: true
	},
    priority: {
        type: String,
        minLength: 3,
        maxLength: 100,
        required: true

    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
        required: true
    },
	date: {
		type: Date,
		default: Date.now
	}
},{
	timestamps: true
})

// model
const Task = mongoose.model("tasks", taskSchema)

// validation
const validate = (task) => {
	const schema = Joi.object({
		title: Joi.string().min(5).max(100).required(),
		description: Joi.string().min(20).max(1000).required(),
		priority: Joi.string().min(1).max(100).required(),
		student: Joi.objectId().required()
	})

	return schema.validate(task)
}

module.exports.Task = Task
module.exports.validate = validate
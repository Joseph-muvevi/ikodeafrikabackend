const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema
const jwt = require("jsonwebtoken")
const config = require("config")
const JoiObjectId = require("joi-objectid")
Joi.ObjectId= JoiObjectId(Joi);

// the student Schema 
const studentSchema = new Schema({
	firstname: {
		type: String,
		minLength: 3,
		maxLength: 100,
		required: true,
	},
	lastname: {
		type: String,
		minLength: 3,
		maxLength: 100,
		required: true
	},
	email: {
		type: String,
		unique: true,
		minLength: 5,
		maxLength: 100,
		required: true
	},
	picture: {
		type: String,
		minLength: 5,
		maxLength: 100,
		required: true
	},
	age: {
		type: Number,
		min: 10,
		max: 200,
		required: true,
	},
	city: {
		type: String,
		minLength: 3,
		maxLength: 100,
		required: true
	},
	country: {
		type: String,
		minLength: 3,
		maxLength: 100,
		required: true
	},
	telephone: {
		type: String,
		minLength: 3,
		maxLength: 100,
		required: true
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
		maxLength: 2000,
	}, 
	date: {
		type: Date,
		default: Date.now
	},
	isstudent: {
		type: Boolean,
		default: true
	},
	// link to the course schema
	enroledcourses: [{
		type: Schema.Types.ObjectId,
		ref: "courses"
	}]
},
{
	timestamps: true
}
)

// crerating the token method
studentSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
	  {
		_id: this._id,
		name: this.name,
		email: this.email,
		isstudent: this.isstudent
	  },
	  config.get("jwtPrivateKey")
	);
	return token;
};


// creating the model
const Student = mongoose.model("students", studentSchema)

// validation
const validate = (student) => {
	const schema = Joi.object({
		firstname: Joi.string().min(3).max(100).required(),
		lastname: Joi.string().min(3).max(100).required(),
		email: Joi.string().min(3).max(100).required().email({minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ke'] }}),
		picture: Joi.string().min(3).max(100).required(),
		age: Joi.number().min(10).max(200).required(),
		city: Joi.string().min(3).max(100).required(),
		country: Joi.string().min(3).max(100).required(),
		telephone: Joi.string().min(3).max(100).required(),
		istuitor: Joi.boolean().required(),
		password: Joi.string().min(6).max(100).required(),
		enroledcourses: Joi.array().items(Joi.ObjectId()).required()
	})

	return schema.validate(student)
}

// exports
module.exports.Student = Student
module.exports.validate = validate
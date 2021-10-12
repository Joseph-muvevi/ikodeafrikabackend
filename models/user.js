const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema
const config = require("config")
const jwt = require("jsonwebtoken")

// the user Schema 
const userSchema = new Schema({
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
	telephone: {
		type: String,
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
	isuser: {
		type: Boolean,
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
	}
},
{
	timestamps: true
}
)
// crerating the token method
userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
		{
			_id: this._id,
			name: this.name,
			email: this.email,
			isuser: this.isuser
		},
		config.get("jwtPrivateKey")
	);
		return token;
	};
  
// creating the model
const User = mongoose.model("users", userSchema)

// input validation
const validate = (user) => {
	const schema = Joi.object({
		firstname: Joi.string().min(3).max(100).required(),
		lastname: Joi.string().min(3).max(100).required(),
		email: Joi.string().min(7).max(100).email().required(),
		telephone: Joi.string().min(10).max(30).required(),
		city: Joi.string().min(3).max(100).required(),
		country: Joi.string().min(3).max(100).required(),
		picture: Joi.string().min(3).max(100).required(),
		age: Joi.number().min(3).max(100).required(),
		isuser:Joi.boolean().required(),
		password: Joi.string().min(6).max(100).required()
	})

	return schema.validate(user)
}

// exports
module.exports.User = User
module.exports.validate = validate
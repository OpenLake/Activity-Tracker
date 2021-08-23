import mongoose from 'mongoose';
const schema = mongoose.Schema;
import jwt from 'jsonwebtoken';
import joi from 'joi';

const UserSchema = new schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

UserSchema.methods.generateAuthToken = function () {
	return jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
};

export const User = mongoose.model('User', UserSchema);

const registerSchema = joi.object({
	name: joi.string().required(),
	email: joi.string().email().required(),
	password: joi.string().required(),
});

const loginSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required(),
});

export const loginValidate = user => loginSchema.validate(user);
export const registerValidate = user => registerSchema.validate(user);

export default User;

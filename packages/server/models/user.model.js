import mongoose from 'mongoose';
const schema = mongoose.Schema;
import jwt from 'jsonwebtoken';
import joi from 'joi';

const UserSchema = new schema({
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	enabled: {
		type: Boolean,
		default: false,
	},
	otp: {
		type: String,
	},
	_devices: [{ type: schema.Types.ObjectId, ref: 'Device' }],
});

UserSchema.methods.generateAuthToken = function (deviceId) {
	const content = { _id: this._id };
	if (deviceId) content._device = deviceId;
	console.log(`Sigining token with content: ${JSON.stringify(content)}`);
	return jwt.sign(content, process.env.JWTPRIVATEKEY);
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

export const registerValidate = user => registerSchema.validate(user);
export const loginValidate = user => loginSchema.validate(user);

export default User;

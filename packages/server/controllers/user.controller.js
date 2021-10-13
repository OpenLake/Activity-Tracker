import { User, registerValidate, loginValidate } from '../models/user.model.js';
import Device from '../models/device.model.js';
import bcrypt from 'bcrypt';
import { emailSender } from '../utils.js';

export const sendOtp = async user => {
	// TODO: Send actual OTP using nodemailer

	//send email to user for otp
	emailSender(user.email)
		.then(result => console.log('Email sent', result))
		.catch(error => console.log(error.message));
};

export const register_user = async (req, res) => {
	try {
		const { error } = registerValidate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const user = new User(req.body);

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		user.password = await bcrypt.hash(user.password, salt);

		// Generate OTP and save user
		user.otp = sendOtp(user);
		await user.save();

		const { email, name } = user;
		res.send({ email, name });
	} catch (error) {
		console.error(error);
		res.send('Something went wrong');
	}
};

export const verify_user = async (req, res) => {
	const { email, otp } = req.query;
	const user = await User.findOne({ email, otp, enabled: false });
	if (user) {
		user.enabled = true;
		await user.save();
		res.send('Successful. You can now login');
	} else {
		res.send('Invalid otp');
	}
};

export const login_user = async (req, res) => {
	try {
		const { error } = loginValidate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const user = await User.findOne({ email: req.body.email, enabled: true });
		const invalidCredMsg = 'Invalid email or password';
		if (!user) return res.status(400).send(invalidCredMsg);

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password,
		);
		if (!validPassword) return res.status(400).send(invalidCredMsg);

		const token = user.generateAuthToken();
		res.send(token);
	} catch (error) {
		console.error(error);
		res.send('Something went wrong');
	}
};

export const user_profile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select('-password -__v');
		res.send(user);
	} catch (error) {
		console.log(error);
		res.send('Unauthorized');
	}
};

export const user_list = async (req, res) => {
	try {
		const user = await User.find({})
			.populate('_devices', 'fingerprint')
			.select('-password -__v');
		res.send(user);
	} catch (error) {
		console.log(error);
		res.send('Something went wrong');
	}
};

export const generate_token = async (req, res) => {
	try {
		// TODO: Validate request format and send error if invalid

		// FIXME: This can be dangerous (as fingerprint can be easily stolen from user's computer)
		// const fingerprint = req.body.fingerprint;
		// let user = await User.findOne({
		// 	'_devices.fingerprint': fingerprint,
		// }).populate('_devices');

		const user = await User.findOne({
			_id: req.user._id,
			enabled: true,
		}).populate('_devices');
		const fingerprint = req.body.fingerprint;

		let device = await Device.findOne({ fingerprint });

		if (user) {
			if (!user._devices.map(d => d._id.toJSON()).includes(device._id)) {
				// Save device in user's device list
				device = new Device({
					fingerprint,
					name: fingerprint,
				});
				await device.save();
				user._devices.push(device._id);
				await user.save();
			}
		}

		// Return token
		const token = user.generateAuthToken(device._id);
		res.send({ token });
	} catch (error) {
		console.error(error);
		res.send('Something went wrong');
	}
};

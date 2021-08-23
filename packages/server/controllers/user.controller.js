import { User, registerValidate, loginValidate } from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const register_user = async (req, res) => {
	try {
		const { error } = registerValidate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const user = new User(req.body);

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		user.password = await bcrypt.hash(user.password, salt);
		await user.save();

		res.send(user.select('-password -__v'));
	} catch (error) {
		console.error(error);
		res.send('Something went wrong');
	}
};

export const login_user = async (req, res) => {
	try {
		const { error } = loginValidate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const user = await User.findOne({ email: req.body.email });
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

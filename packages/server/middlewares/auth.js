import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export default async (req, res, next) => {
	try {
		const token = req.get('X-Auth-Token');
		if (!token) {
			return res.status(403).send('Access denied');
			// const user = await User.findOne({});
			// req.user = { _id: user._id };
		} else {
			const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
			req.user = decoded;
		}

		next();
	} catch (error) {
		res.status(400).send('Invalid token');
	}
};

import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export default async (req, res, next) => {
	try {
		const token = req.get('X-Auth-Token');
		if (!token) {
			// We are still in the development phase so we are assuming that
			// every request is made by the first user that exists in the DB
			if (process.env.USE_DEFAULT_USER) {
				const user = await User.findOne({});
				req.user = { _id: user._id };
			} else {
				return res.status(403).send('Access denied');
			}
		} else {
			const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
			req.user = decoded;
		}

		next();
	} catch (error) {
		res.status(400).send('Invalid token');
	}
};

import jwt from 'jsonwebtoken';

export default (req, res, next) => {
	try {
		const token = req.headers('X-Auth-Token');
		if (!token) return res.status(403).send('Access denied');

		const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).send('Invalid token');
	}
};

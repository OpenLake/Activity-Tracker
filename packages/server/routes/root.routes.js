import { useLocal } from '../config.js';
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
	const routes = {
		apps: 'http://localhost:3000/apps',
		activities: 'http://localhost:3000/activities',
	};
	if (!useLocal) routes.users = 'http://localhost:3000/users';
	res.json(routes);
});

export default router;

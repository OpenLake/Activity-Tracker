import { useLocal } from '../config.js';
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
	const routes = {
		apps: 'http://localhost:3000/api/apps',
		activities: 'http://localhost:3000/api/activities',
	};
	if (!useLocal) routes.users = 'http://localhost:3000/api/users';
	res.json(routes);
});

export default router;

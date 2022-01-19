import { useLocal } from '../config.js';
import express from 'express';
const router = express.Router();

const port = process.env.PORT || 8080;

router.get('/', (req, res) => {
	const routes = {
		apps: `http://localhost:${port}/api/apps`,
		activities: `http://localhost:${port}/api/activities`,
		browseractivities: `http://localhost:${port}/api/browseractivities`,
	};
	if (!useLocal) routes.users = `http://localhost:${port}/api/users`;
	res.json(routes);
});

export default router;

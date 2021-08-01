import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
	res.json({
		apps: 'http://localhost:3000/apps',
		activities: 'http://localhost:3000/activities',
	});
});

export default router;

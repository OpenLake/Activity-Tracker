import express from 'express';
import * as activity_controller from '../controllers/activity.controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, activity_controller.all_activities);
router.post('/', auth, activity_controller.activity_create);

export default router;

import express from 'express';
import * as activity_controller from '../controllers/activity.controller.js';

const router = express.Router();

router.get('/', activity_controller.all_activities);
router.post('/', activity_controller.activity_create);

export default router;

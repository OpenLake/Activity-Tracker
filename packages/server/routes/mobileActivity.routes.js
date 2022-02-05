import express from 'express';
import auth from '../middlewares/auth.js';
import { mobile_activity_controller } from '../controllers/index.js';

const router = express.Router();

router.get('/', mobile_activity_controller.all_activities);
router.post('/', mobile_activity_controller.activity_create);

export default router;

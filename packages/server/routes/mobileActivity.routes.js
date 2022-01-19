import express from 'express';
import auth from '../middlewares/auth.js';
import { activity_controller } from '../controllers/index.js';

const router = express.Router();

router.get('/', auth, activity_controller.all_activities);
router.post('/', auth, activity_controller.activity_create);

export default router;
